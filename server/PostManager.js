//Imports
const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");
const FollowManager = require("./FollowManager.js");
const CommentManager = require("./CommentManager.js");
const BlockManager = require("./BlockManager.js");
const BookmarkManager = require("./BookmarkManager.js");

class PostManager {
  async upload(userID, file, tags, description, visibility) {
    const buffer = file.buffer;
    const fileName = sha1(buffer);
    const url = "post/" + fileName;
    const mimetype = file.mimetype;

    const firebaseStorageManager = new FirebaseStorageManager();
    const postLink = await firebaseStorageManager.uploadFile(
      buffer,
      url,
      mimetype
    );
    try {
      //It is a promise because this needs to run first
      //So we can create the tags first then upload the post then attach the tags to the post
      const tagPromises = tags.map(async (tag) => {
        //Look through each of the tags
        const doesTagExist = await this.#doesTagExist(tag);
        //Check if that tag exits
        //If not: create it
        if (!doesTagExist) {
          await this.#createTag(tag);
        }
      });
      await Promise.all(tagPromises);

      //Create the post
      const query = `INSERT INTO post (userID, postLink, isVideo, description, postVisibility) VALUES (?,?,?,?,?);`;

      const isVideo = mimetype.match("video*") ? 1 : 0;

      await update(query, [userID, postLink, isVideo, description, visibility]);
      //Since this is the latest post, we can get its ID
      const postID = await this.#getLatestPostID(userID);
      //Now we have the postID, we can attach the tags to the post
      await this.#attachTagsToPost(tags, postID);
    } catch (error) {
      return error;
    }
  }

  async updatePost(postID, tags, description, visibility) {
    try {
      console.log(tags);
      //It is a promise because this needs to run first
      //So we can create the tags first then upload the post then attach the tags to the post
      const tagPromises = tags.map(async (tag) => {
        //Look through each of the tags
        const doesTagExist = await this.#doesTagExist(tag);
        //Check if that tag exits
        //If not: create it
        if (!doesTagExist) {
          await this.#createTag(tag);
        }
      });
      await Promise.all(tagPromises);

      //Create the post
      const query = `UPDATE post SET description = ?,postVisibility = ? WHERE (postID = ?);`;

      await update(query, [description, visibility, postID]);

      await this.updateTags(postID, tags);
    } catch (error) {
      return error;
    }
  }

  //This is a private method because only need to run this when a post is being uploaded
  //It is for abstraction
  async #doesTagExist(tag) {
    try {
      const query = `SELECT count(*) FROM instabun.Tag where TagName = ?;`;
      const [result] = await select(query, [tag]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //This is a private method because only need to run this when a post is being uploaded
  //It is for abstraction
  async #createTag(tag) {
    try {
      const query = `INSERT INTO instabun.Tag (TagName) VALUES (?);`;
      await update(query, [tag]);
      return "Create tag operation successful";
    } catch (error) {
      return error;
    }
  }

  async updateTags(postID, tags) {
    try {
      const oldTags = await this.getAllPostTagName(postID);
      console.log(oldTags);

      const lowerOldTags = oldTags.map((tagName) => tagName.toLowerCase());
      const lowerNewTagIDs = tags.map((tagName) => tagName.toLowerCase());

      const addTags = lowerNewTagIDs.filter(
        (tagName) => !lowerOldTags.includes(tagName)
      );

      console.log(addTags);

      const removeTags = lowerOldTags.filter(
        (tagName) => !lowerNewTagIDs.includes(tagName)
      );

      console.log(removeTags);

      if (removeTags.length > 0) {
        await this.#removeTagsFromPost(removeTags, postID);
      }

      if (addTags.length > 0) {
        await this.#attachTagsToPost(addTags, postID);
      }
    } catch (error) {
      return error;
    }
  }

  async getAllPostTagName(postID) {
    try {
      const query = `Select tagName from tagpost INNER JOIN tag on tag.tagID = tagpost.tagID where postID = ?`;
      const result = await select(query, [postID]);
      return result ? result.map((tag) => tag?.["tagName"]) : [];
    } catch (error) {
      return error;
    }
  }

  async #removeTagsFromPost(tags, postID) {
    try {
      const tagIDsArray = await this.#getTagIDs(tags);
      const attachTagIDToPostPromise = tagIDsArray.map(async (tagID) => {
        const query = `DELETE FROM tagpost WHERE (postID = ?) and (tagID = ?);`;
        await update(query, [postID, tagID]);
      });
      await Promise.all(attachTagIDToPostPromise);
      return "Attach tags to post operation successful";
    } catch (error) {
      return error;
    }
  }

  //User will upload a post at a time
  //The latest postID is the post the user just uploaded
  async #getLatestPostID(userID) {
    try {
      const query = `SELECT postID FROM Post where UserID = ? Order by postID DESC Limit 1;`;
      const [result] = await select(query, [userID]);
      return result.postID;
    } catch (error) {
      return error;
    }
  }

  async #attachTagsToPost(tags, postID) {
    try {
      const tagIDsArray = await this.#getTagIDs(tags);
      const attachTagIDToPostPromise = tagIDsArray.map(async (tagID) => {
        //Now attaching individual tag to the post
        const query = `INSERT INTO tagpost (postID,tagID) VALUES (?,?);`;
        await update(query, [postID, tagID]);
      });
      await Promise.all(attachTagIDToPostPromise);
      return "Attach tags to post operation successful";
    } catch (error) {
      return error;
    }
  }

  //Get the posts from the tags the user entered
  async getPostViaTags(userID, tags) {
    try {
      //It is a promise because this needs to run first
      //Because we might have a post attached to the tag the user search for
      const tagPromises = tags.map(async (tag) => {
        //Look through each of the tags
        const doesTagExist = await this.#doesTagExist(tag);
        //Check if that tag exits
        //Can not search for a video that contains a tag that does not exits
        if (!doesTagExist) {
          tags.pop(tag);
        }
      });

      await Promise.all(tagPromises);

      //Post that contains the tag/s does not exists
      if (tags.length === 0) {
        return new Error("Unable to retrieve post via the provided tags");
      }

      const tagIDsArray = await this.#getTagIDs(tags);

      const posts = await this.#getPostForAll(userID, tagIDsArray);

      console.log("Balls: " + tagIDsArray);
      console.log("Balls: " + posts);

      if (!posts.length || !posts) {
        return new Error("Unable to retrieve post via the provided tags");
      }

      const filteredPost = await this.#addUploaderDetails(posts);

      const completePosts = await this.#addPostDetails(userID, filteredPost);

      return completePosts;
    } catch (error) {
      return error;
    }
  }

  //Small algorithm to get post to recommend
  //1 -> get top 10 tags
  //2 -> get post that contains that tags
  //3 -> get post that user has not liked
  async getUserRecommendation(userID) {
    try {
      const top10TagIDs = await this.#getPersonalTop10TagIDs(userID);

      if (!top10TagIDs.length || !top10TagIDs) {
        return [];
      }

      const unlikedPostIDs = await this.#getUnlikedPostIDs(userID, top10TagIDs);

      if (!unlikedPostIDs.length || !unlikedPostIDs) {
        return new Error(
          "Unable to give recommendation as user has liked all post"
        );
      }

      const posts = await this.#addUploaderDetails(unlikedPostIDs);

      const completePost = await this.#addPostDetails(userID, posts);

      return completePost;
    } catch (error) {
      return error;
    }
  }

  async #getUnlikedPostIDs(userID, tagIDs) {
    const publicPostIDs = await this.#getPostForAll(userID, tagIDs);

    const unlikedPostIDs = [];

    for (const postID of publicPostIDs) {
      const hasUserNotLikedPost = !(await this.hasLiked(postID, userID));
      if (hasUserNotLikedPost) {
        unlikedPostIDs.push(postID);
      }
    }

    console.log(unlikedPostIDs);

    return unlikedPostIDs;
  }

  async getGeneralReccomendation(userID) {
    try {
      const top10TagIDs = await this.#getTop10TagIDs(userID);

      const publicPostIDs = await this.#getPostForAll(userID, top10TagIDs);

      if (!publicPostIDs.length || !publicPostIDs) {
        return new Error(
          "Unable to give recommendation as user has liked all post"
        );
      }

      const posts = await this.#addUploaderDetails(publicPostIDs);

      const completePosts = await this.#addPostDetails(userID, posts);

      return completePosts;
    } catch (error) {
      return error;
    }
  }

  //This method filters all the post
  //Only return post that the user has allowed everyone to see
  //If the uploader(the user who created the post) does not allow everyone to see
  //The post will not be included
  //This method is used for the explore screen
  async #getPostForAll(userID, tagsArray) {
    try {
      const blockManager = new BlockManager();

      //Get post that is public to all
      const query = `SELECT tagpost.postID,post.userID FROM tagpost INNER JOIN post ON post.postID = tagpost.postID WHERE tagID IN (?) AND postVisibility = 0 GROUP BY post.postID ORDER BY COUNT(DISTINCT tagID) DESC`;

      const result = await select(query, [tagsArray]);

      console.log("E: " + result);

      //If there is no post with that tags
      //Return empty
      if (!result || !result.length) {
        return [];
      }

      const filteredPostIDs = [];

      //User should not be able to view content from people who blocked them
      for (const { userID: uploaderUserID, postID: postID } of result) {
        const isBlocked = await blockManager.isUserBlocked(
          userID,
          uploaderUserID
        );
        console.log(isBlocked);
        const hasBlocked = await blockManager.isUserBlocked(
          uploaderUserID,
          userID
        );
        console.log(hasBlocked);
        if (!isBlocked && !hasBlocked) {
          filteredPostIDs.push(postID);
        }
      }

      return filteredPostIDs;
    } catch (error) {
      return error;
    }
  }

  //Help to get post to recommendard -> user's top 10
  async #getPersonalTop10TagIDs(userID) {
    try {
      const query = `SELECT tagID FROM likepost INNER JOIN tagpost on tagpost.postID = likepost.postID where userID = ? group by tagID order by count(*) DESC LIMIT 10`;
      const result = await select(query, [userID]);
      return result ? result.map((element) => element?.["tagID"]) : [];
    } catch (error) {
      return error;
    }
  }

  //Help to get post to recommendard -> based on what everyone like
  //This will be used to help when the user is new and/or has no like
  async #getTop10TagIDs() {
    try {
      const query = `SELECT tagID FROM likepost INNER JOIN tagpost on tagpost.postID = likepost.postID  group by tagID order by count(*) DESC LIMIT 10`;
      const result = await select(query);
      return result ? result.map((tagID) => tagID?.["tagID"]) : [];
    } catch (error) {
      return error;
    }
  }

  async #addUploaderDetails(postIDs) {
    try {
      const query = `
        SELECT postID AS id, users.userID, users.profileIcon, users.username, 
               postLink, isVideo, description, uploadDate, post.postVisibility 
        FROM instabun.post 
        INNER JOIN users on users.userID = post.userID 
        WHERE postID IN (?) 
        ORDER BY FIELD(postID, ?)
      `;
      const result = await select(query, [postIDs, postIDs]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //The posts should include a key value for the visibility
  //After filtering, the visibility will be removed because it is just for filtering purpose
  async #filterPost(userID, posts) {
    try {
      //Managers
      const followManager = new FollowManager();
      //Array for filtered post
      const filteredPost = [];
      //Iterating through posts
      const promises = posts.map(async (post) => {
        const postVisibility = post["postVisibility"];
        console.log(postVisibility);
        const uploaderUserID = post["userID"];

        // Handle public posts
        if (postVisibility === 0) {
          delete post["postVisibility"];
          filteredPost.push(post);
        } else if (postVisibility === 1) {
          // Check if user is following the uploader
          const isFollowing = await followManager.isFollowing(
            userID,
            uploaderUserID
          );
          if (isFollowing) {
            delete post["postVisibility"];
            filteredPost.push(post);
          }
        } else if (postVisibility === 2) {
          //Checks if the two users are close friends
          const isCloseFriend = await followManager.isCloseFriend(
            userID,
            uploaderUserID
          );
          if (isCloseFriend) {
            delete post["postVisibility"];
            filteredPost.push(post);
          }
        }
      });

      // Wait for all promises to complete
      await Promise.all(promises);
      //Resorting the list because promises does not keep it original order
      filteredPost.sort(
        (a, b) => new Date(b["uploadDate"]) - new Date(a["uploadDate"])
      );
      return filteredPost;
    } catch (error) {
      return error;
    }
  }

  //This function is used to get the post from the link they shared
  async getSingularPost(userID, postID) {
    try {
      //The uploader may have changed the permission of the video
      //So we have to take that into account
      const post = await this.#addUploaderDetails(postID);

      const filteredPost = await this.#filterPost(userID, post);

      const postDetailsArray = await this.#addPostDetails(userID, filteredPost);

      return postDetailsArray;
    } catch (error) {
      return error;
    }
  }

  //The function returns all the important information about the post
  async #addPostDetails(userID, filteredPost) {
    try {
      //Managers
      const commentManager = new CommentManager();
      const bookmarkManager = new BookmarkManager();

      const promises = filteredPost.map(async (post) => {
        const postID = post["id"];
        const [
          totalLike,
          hasLiked,
          totalComment,
          totalShare,
          hasBookmarked,
          bookmarkIDs,
        ] = await Promise.all([
          this.getTotalLike(postID),
          this.hasLiked(postID, userID),
          commentManager.getTotalComment(postID),
          this.getTotalShare(postID),
          bookmarkManager.hasBookmarked(userID, postID),
          bookmarkManager.getBookmarkIDsbyPostID(postID),
        ]);

        post["totalLike"] = totalLike;
        post["hasLiked"] = hasLiked;
        post["totalComment"] = totalComment;
        post["totalShare"] = totalShare;
        post["hasBookmarked"] = hasBookmarked;
        post["bookmarkIDs"] = bookmarkIDs;
      });
      await Promise.all(promises);
      return filteredPost;
    } catch (error) {
      return error;
    }
  }

  async #getTagIDs(tags) {
    try {
      const query = `SELECT tagID FROM instabun.Tag WHERE tagName in (?);`;
      const result = await select(query, [tags]);
      //Convert JSON to array for easy reading
      const idsArray = result.map((element) => element.tagID);
      return idsArray;
    } catch (error) {
      return error;
    }
  }

  async like(postID, userID) {
    try {
      const query = `Insert into likepost(postID,userID) Values(?,?);`;
      await update(query, [postID, userID]);
      return "Like post operation successful";
    } catch (error) {
      return error;
    }
  }

  async unlike(postID, userID) {
    try {
      const query = `Delete from likepost where postID = ? AND userID = ?;`;
      await update(query, [postID, userID]);
      return "Unlike post operation successful";
    } catch (error) {
      return error;
    }
  }

  //Return an int of total likes
  async getTotalLike(postID) {
    try {
      const query = "SELECT COUNT(*) FROM likepost WHERE postID = ?;";
      const [result] = await select(query, [postID]);
      return result["COUNT(*)"];
    } catch (error) {
      return error;
    }
  }

  async hasLiked(postID, userID) {
    try {
      const query =
        "SELECT COUNT(*) FROM likepost WHERE postID = ? AND likepost.userID = ?";
      const [result] = await select(query, [postID, userID]);
      return result["COUNT(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Return a list of people who liked the post
  async getLikedList(postID, userID) {
    try {
      console.log(postID);
      //Manager
      const followManager = new FollowManager();

      const query = `SELECT likepost.userID, username, displayName,profileIcon FROM likepost INNER JOIN users on users.userID = likepost.userID WHERE postID = ?`;

      const result = await select(query, [postID]);

      const promises = result.map(async (user) => {
        const liker = user["userID"];
        const isFollowing = await followManager.isFollowing(userID, liker);
        user["isFollowing"] = isFollowing;
      });

      await Promise.all(promises);

      result.sort((a, b) => a["isFollowing"] > b["isFollowing"]);

      return result;
    } catch (error) {
      return error;
    }
  }

  //This is for the main screen
  async getFollowingPost(userID) {
    try {
      //Manager
      const followManager = new FollowManager();

      const followingList = await followManager.getFollowings(userID);

      if (!followingList.length || !followingList) {
        return new Error(
          "Unable to get following post because user is not following anyone"
        );
      }

      const query = `SELECT postID AS id, users.userID, users.profileIcon, users.username, postLink,isVideo, description, uploadDate,post.postVisibility FROM instabun.post INNER JOIN users ON post.userID = users.userID WHERE post.userID IN (?) ORDER BY uploadDate DESC;`;

      const result = await select(query, [followingList]);

      const filteredPosts = await this.#filterPost(userID, result);

      const completedPosts = await this.#addPostDetails(userID, filteredPosts);

      console.log(followingList);

      return completedPosts;
    } catch (error) {
      return error;
    }
  }

  async getProfilePost(viewerID, profileUserID) {
    try {
      const postIDs = (
        await select(`SELECT postID FROM instabun.post where userID = ?;`, [
          profileUserID,
        ])
      ).map((element) => element?.["postID"]);

      if (!postIDs.length || !postIDs) {
        return new Error("The user does not have any posts");
      }

      const posts = await this.#addUploaderDetails(postIDs);

      console.log(posts);

      if (viewerID == profileUserID) {
        const completePosts = await this.#addPostDetails(viewerID, posts);

        return completePosts;
      }

      const filteredPosts = await this.#filterPost(viewerID, posts);

      const completePosts = await this.#addPostDetails(viewerID, filteredPosts);

      return completePosts;
    } catch (error) {
      return error;
    }
  }

  async getUserPosts(userID) {
    try {
      const query = `SELECT post.*, JSON_ARRAYAGG(tagName) AS tags FROM post INNER JOIN tagpost ON tagpost.postID = post.postID INNER JOIN tag ON tag.tagID = tagpost.tagID WHERE userID = ? GROUP BY post.postID`;
      const result = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //Returns true or false if the user has shared
  async hasShared(userID, postID) {
    try {
      const query = `SELECT count(*) FROM sharepost where postID = ? AND userID = ?;`;
      const [result] = await select(query, [postID, userID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Save that the user shared the post
  async share(userID, postID) {
    try {
      const hasShared = await this.hasShared(userID, postID);
      if (hasShared) {
        const query = `INSERT INTO sharepost(postID,userID) Values(?,?);`;
        await update(query, [postID, userID]);
        return "Record share action operation successful";
      }
    } catch (error) {
      return error;
    }
  }

  async getTotalShare(postID) {
    try {
      const query = `Select count(*) from sharepost where postID = ?`;
      const [result] = await select(query, [postID]);
      return result["count(*)"];
    } catch (error) {
      return error;
    }
  }
}

module.exports = PostManager;
