//Imports
const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");
const FollowManager = require("./FollowManager.js");

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

  //This function get the postID of the post that contains all the tags that the user is searching for

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
  async getPostViaTags(userID, tags, page) {
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

      const filteredPost = await this.#getPostForAll(tagIDsArray, page);

      const postDetailsArray = await this.#getPostDetails(userID, filteredPost);

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
  async getPostBasedLike(userID, page) {
    try {
      const query = `
      SELECT 
      PostTags.tagID as currentTag,
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

      const filteredPost = await this.#getPostForAll(tagIDsArray, page);

      const postDetailsArray = await this.#getPostDetails(userID, filteredPost);

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
  async #getPostForAll(tagsArray, page) {
    const postPerPage = 3;
    page *= postPerPage;
    try {
      const query = `
      SELECT 
      postID,
      Post.UserID,
      Users.Visibility,
      COUNT(DISTINCT tagID) AS total
  FROM
      instabun.PostTags
  INNER JOIN
      Post ON Post.idPost = PostTags.postID
  INNER JOIN
      Users ON Users.UserID = Post.UserID
  WHERE
      tagID IN (?)
      AND Users.Visibility = 0
  GROUP BY postID
  ORDER BY total DESC
  LIMIT ${page},${postPerPage}
  `;

      const result = await select(query, [tagsArray]);

      //Filter and only return what is important
      //Not important to return the setting of the uploader
      //Import to return the postID and who uploaded the post
      const postIDAndUserIDArray = result.map((element) => {
        const postIDAndUserID = {
          postID: element.postID,
          userID: element.UserID,
        };
        return postIDAndUserID;
      });

      return postIDAndUserIDArray;
    } catch (error) {
      return error;
    }
  }

  //This method is used for the main screen and profile scren
  //The method filters the post of the uploader(the user who uploaded the video)
  //The uploader might have said that not everyone can see but only friends
  //This deals with that
  async #filterPost(userID, postIDsArray, page) {
    const postPerPage = 3;
    page *= postPerPage;
    //Since the PostVisibility is:
    //0 -> Everyone
    //1 -> Followers
    //2 -> Mutural / Friends
    //3 -> No one
    //It is easy to do comparison with counting who follow who
    //0 -> Neither of them follow each other
    //1 -> Only one of them follows
    //2 -> Both of them follow each other
    //3 -> Impossible
    try {
      const query = `
    SELECT 
      Post.idPost,
      Users.UserID,
      Users.Visibility,
      (SELECT 
      COUNT(*)
        FROM
        instabun.Follows
        WHERE
          (FollowerID = ?
          AND FollowingID = Users.UserID)
          OR (FollowerID = Users.UserID
          AND FollowingID = ?))
      AS Status
        FROM
        instabun.Post
        INNER JOIN
          Users ON Users.UserID = Post.UserID
        WHERE
          Post.idPost IN (?)
        HAVING Status >= Users.Visibility
        ORDER BY Post.idPost DESC
        LIMIT ${page},${postPerPage};`;
      const result = await select(query, [userID, userID, postIDsArray]);

      //Filter and only return what is important
      //Not important to return the relationship between the two users
      //Not important to return the setting of the uploader
      //Import to return the postID and who uploaded the post
      const postIDAndUserIDArray = result.map((element) => {
        const postIDAndUserID = {
          postID: element.idPost,
          userID: element.UserID,
        };
        return postIDAndUserID;
      });

      return postIDAndUserIDArray;
    } catch (error) {
      return error;
    }
  }

  //This function is used to get the post from the link they shared
  async getSingularPost(userID, postID) {
    try {
      const filteredPost = await this.#filterPost(userID, postID, 0);

      const postDetailsArray = await this.#getPostDetails(userID, filteredPost);

      return postDetailsArray;
    } catch (error) {
      return error;
    }
  }

  //The function returns all the important information about the post
  //The information are:
  //The postID
  //The uploader's username and link to the profile icon
  //If the user liked the post
  //How many people liked the post
  //How many people commented in the post
  //How many people shared the post
  async #getPostDetails(userID, filteredPost) {
    try {
      const postDetailsArray = await Promise.all(
        filteredPost.map(async (element) => {
          const uploader = element.userID;
          const upload = element.postID;

          try {
            const uploaderDetailQuery = `SELECT Username, ProfileIconLink FROM instabun.Users WHERE UserID = ?;`;
            const [uploaderDetail] = await select(uploaderDetailQuery, [
              uploader,
            ]);

            const uploadDetailQuery = `SELECT
            isVideo,
            PostLink,
            Title,
            (SELECT COUNT(*) FROM PostLike WHERE PostLike.postID = ? AND PostLike.userID = ?) AS didUserLike,
            (SELECT COUNT(*) FROM PostLike INNER JOIN Post ON PostLike.postID = Post.idPost WHERE Post.idPost = ?) AS likeCount,
            (SELECT COUNT(*) FROM PostShare INNER JOIN Post ON PostShare.postID = Post.idPost WHERE Post.idPost = ?) AS shareCount,
            (SELECT COUNT(*) FROM PostComment INNER JOIN Post ON PostComment.postID = Post.idPost WHERE Post.idPost = ?) AS commentCount
            FROM Post
            WHERE Post.idPost = ?;`;
            const [uploadDetail] = await select(uploadDetailQuery, [
              upload,
              userID,
              upload,
              upload,
              upload,
              upload,
            ]);

            const details = {
              postID: upload,
              uploadDetail: uploadDetail,
              uploaderDetail: uploaderDetail,
            };

            return details;
          } catch (error) {
            return error;
          }
        })
      );

      return postDetailsArray;
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

  async getLikedList(postID, userID) {
    try {
      const query = `SELECT 
    likepost.userID, username, displayName,profileIcon,
    (SELECT 
            COUNT(*)
        FROM
            followers
        WHERE
            FollowerID = ? AND followingID = likepost.userID) AS isFollowing
FROM
    likepost
	INNER JOIN users on users.userID = likepost.userID
WHERE
    postID = ? ORDER BY isFollowing DESC;`;
      const result = await select(query, [userID, postID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //This is for the main screen
  async getFollowingPost(userID) {
    try {
      const query = `SELECT 
    postID AS id,
    users.userID,
    users.profileIcon,
    users.username,
    postLink,
    isVideo,
    description,
    uploadDate,
    (SELECT 
            COUNT(*)
        FROM
            likepost
        WHERE
            likepost.postID = id) AS totalLike,
    (SELECT 
            COUNT(*)
        FROM
            likepost
        WHERE
            postID = id AND likepost.userID = ?) AS hasLiked,
    (SELECT 
            COUNT(*)
        FROM
            commentpost
        WHERE
            commentpost.postID = id) AS totalComment,
    (SELECT 
            COUNT(*)
        FROM
            bookmark
                INNER JOIN
            bookmarkpost ON bookmarkpost.bookmarkID = bookmark.bookmarkID
        WHERE
            userID = ? AND bookmarkpost.postID = id) AS hasBookmarked
FROM
    instabun.post
        INNER JOIN
    users ON post.userID = users.userID
WHERE
    post.userID IN (SELECT 
            FollowingID
        FROM
            followers
        WHERE
            FollowerID = ?)
        AND post.postVisibility <= (SELECT 
            COUNT(*)
        FROM
            followers
        WHERE
            (followers.followerID = ?
                AND FollowingID = post.userID)
                OR (FollowerID = post.userID
                AND FollowingID = ?))
ORDER BY uploadDate DESC;`;

      const result = await select(query, [
        userID,
        userID,
        userID,
        userID,
        userID,
      ]);

      return result;
    } catch (error) {
      return error;
    }
  }

  async getProfilePost(viewerID, profileUserID, page) {
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

        const postDetailsArray = await this.#getPostDetails(
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
        const postDetailsArray = await this.#getPostDetails(
          viewerID,
          postIDAndUserIDArray
        );

        return postDetailsArray;
      }
    } catch (error) {
      return error;
    }
  }

  async hasShared(userID, postID) {
    try {
      const query = `SELECT count(*) FROM instabun.PostShare where postID = ? AND userID = ?;`;
      const [result] = await select(query, [postID, userID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async share(userID, postID) {
    try {
      const query = `INSERT INTO PostShare(postID,userID) Values(?,?);`;
      await update(query, [postID, userID]);
      return "Record share action operation successful";
    } catch (error) {
      return error;
    }
  }
}

module.exports = PostManager;
