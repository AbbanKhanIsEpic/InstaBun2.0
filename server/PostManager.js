//Imports
const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");
const FollowManager = require("./FollowManager.js");
const CommentManager = require("./CommentManager.js");
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
          this.#createTag(tag);
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

      const filteredPost = await this.#getPostForAll(tagIDsArray);

      const postDetailsArray = await this.#addPostDetails(userID, filteredPost);

      return postDetailsArray;
    } catch (error) {
      return error;
    }
  }

  //This is used when the user open the explore screen and have searched for nothing
  //Rather than just having a blank screen
  //This small algorithm to get popular videos that:
  //If user has liked no post: show them what most people like
  //If user has liked post: show them a mix of what they like and people really like
  async getPostBasedLike(userID) {
    try {
      const query = `SELECT PostTags.tagID as currentTag,
      COUNT(PostTags.tagID) AS TotalLike,
      (SELECT 
      (count(*)*100) 
      FROM 
        PostLike 
        INNER JOIN 
          PostTags ON PostTags.postID = PostLike.postID 
        WHERE 
          PostTags.tagID = currentTag AND PostLike.userID = ?
      ) as TotalUserLike
      FROM
      PostLike
        INNER JOIN
          PostTags ON PostTags.postID = PostLike.postID
        INNER JOIN
          Tag ON PostTags.tagID = Tag.idTag
        GROUP BY currentTag
        ORDER BY  TotalUserLike DESC, TotalLike DESC
        LIMIT 10;`;

      const tagIDsResultSet = await select(query, [userID]);

      //Convert JSOn to array for easy reading
      const tagIDsArray = tagIDsResultSet.map((element) => element.currentTag);

      const filteredPost = await this.#getPostForAll(tagIDsArray);

      const postDetailsArray = await this.#addPostDetails(userID, filteredPost);

      return postDetailsArray;
    } catch (error) {
      return error;
    }
  }

  //This method filters all the post
  //Only return post that the user has allowed everyone to see
  //If the uploader(the user who created the post) does not allow everyone to see
  //The post will not be included
  //This method is used for the explore screen
  async #getPostForAll(tagsArray) {
    try {
      const query = `SELECT tagpost.postID, userID FROM tagpost INNER JOIN post ON post.postID = tagpost.postID WHERE tagID IN (?) AND postVisibility = 0 GROUP BY postID ORDER BY COUNT(DISTINCT tagID) DESC`;

      const result = await select(query, [tagsArray]);

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
      const filteredPost = await this.#filterPost(userID, postID);

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
        const [totalLike, hasLiked, totalComment, hasBookmarked] =
          await Promise.all([
            this.getTotalLike(postID),
            this.hasLiked(postID, userID),
            commentManager.getTotalComment(postID),
            bookmarkManager.hasBookmarked(userID, postID),
          ]);

        post["totalLike"] = totalLike;
        post["hasLiked"] = hasLiked;
        post["totalComment"] = totalComment;
        post["hasBookmarked"] = hasBookmarked;
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

  async getLikedList(postID, userID) {
    try {
      //Manager
      const followManager = new FollowManager();

      const query = `SELECT likepost.userID, username, displayName,profileIcon, FROM likepost INNER JOIN users on users.userID = likepost.userID WHERE postID = ? ORDER BY isFollowing DESC;`;

      const result = await select(query, [userID, postID]);

      const promises = result.map(async (user) => {
        const liker = user["userID"];
        const isFollowing = await followManager.isFollowing(userID, liker);
        user["isFollowing"] = isFollowing;
      });

      await Promise.all(promises);

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

      const query = `SELECT postID AS id, users.userID, users.profileIcon, users.username, postLink,isVideo, description, uploadDate,post.postVisibility FROM instabun.post INNER JOIN users ON post.userID = users.userID WHERE post.userID IN (?) ORDER BY uploadDate DESC;`;

      const result = await select(query, [followingList]);

      const filteredPosts = await this.#filterPost(userID, result);

      const completedPosts = await this.#addPostDetails(userID, filteredPosts);

      return completedPosts;
    } catch (error) {
      return error;
    }
  }

  async getProfilePost(viewerID, profileUserID) {
    try {
      const postIDsResultSet = await select(
        `SELECT Post.idPost FROM instabun.Users INNER JOIN Post ON Post.UserID = Users.UserID WHERE Users.UserID = ?;`,
        [profileUserID]
      );

      //Convert JSON to array for easy reading
      const postIDsArray = postIDsResultSet.map((element) => element.idPost);

      //The return will be undefined
      if (postIDsArray.length === 0) {
        throw new Error("User does not have any post");
      }

      //If the user is not looking at their own post
      if (viewerID != profileUserID) {
        const filteredPost = await this.#filterPost(
          viewerID,
          postIDsArray,
          page
        );

        const postDetailsArray = await this.#addPostDetails(
          viewerID,
          filteredPost
        );

        return postDetailsArray;
      } else {
        const postPerPage = 3;
        page *= postPerPage;
        //The user should be able to view their own post
        //Even if they are allowed no one to see it
        const filteringPost = await select(
          `SELECT 
        Post.idPost,
        Users.UserID
          FROM
          instabun.Post
          INNER JOIN
            Users ON Users.UserID = Post.UserID
          WHERE
            Post.idPost IN (?)
          ORDER BY Post.idPost DESC
          LIMIT ${page},${postPerPage};`,
          [postIDsArray]
        );

        const postIDAndUserIDArray = filteringPost.map((element) => {
          const postIDAndUserID = {
            postID: element.idPost,
            userID: element.UserID,
          };
          return postIDAndUserID;
        });
        const postDetailsArray = await this.#addPostDetails(
          viewerID,
          postIDAndUserIDArray
        );

        return postDetailsArray;
      }
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
}

module.exports = PostManager;
