const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");
const FollowManager = require("./FollowManager.js");

class StoryManager {
  async upload(userID, file, visibility) {
    try {
      const buffer = file.buffer;
      const fileName = sha1(buffer);
      const url = "story/" + fileName;
      const mimetype = file.mimetype;

      const firebaseStorageManager = new FirebaseStorageManager();
      const storyLink = await firebaseStorageManager.uploadFile(
        buffer,
        url,
        mimetype
      );

      const isVideo = mimetype.match("video*") ? 1 : 0;

      const query = `INSERT INTO story (userID, isVideo, storyLink, storyVisibility) VALUES (?,?,?,?);
`;
      await update(query, [userID, isVideo, storyLink, visibility]);
      return "Upload story operation successful";
    } catch (error) {
      return error;
    }
  }

  //Get the details of the stories
  //Stories only last for a day
  //So it is only getting stories that is a less or equal to a day old
  async getStories(userID) {
    try {
      //Manager
      const followManager = new FollowManager();

      const followingList = (await followManager.getFollowings(userID)).map(
        (element) => {
          return element?.["FollowingID"];
        }
      );

      if (!followingList.length) {
        return new Error(
          "Unable to get a story because user is not following anyone"
        );
      }

      followingList.push(userID);

      const getStoryIDQuery = `SELECT storyID FROM instabun.story where userID in (?) AND timestampdiff(hour,uploadDate,now()) <= 24`;

      const storyIDs = await select(getStoryIDQuery, [followingList]);

      const filteredStoryIDs = await this.filter(userID, storyIDs);

      const compeleteStories = await this.addDetails(filteredStoryIDs);

      return compeleteStories;
    } catch (error) {
      return error;
    }
  }

  async filter(userID, storyIDs) {
    //Managers
    const followManager = new FollowManager();
    //Array for filtered post
    const filteredPost = [];
    //Iterating through posts
    const promises = storyIDs.map(async (story) => {
      const storyID = story["storyID"];

      const uploaderUserID = await this.getUploaderID(storyID);
      const visibility = await this.getVisibility(storyID);

      if (uploaderUserID == userID) {
        filteredPost.push(storyID);
      } else {
        if (visibility == 0) {
          filteredPost.push(storyID);
        } else if (visibility == 1) {
          const isFollowing = await followManager.isFollowing(
            userID,
            uploaderUserID
          );
          if (isFollowing) {
            filteredPost.push(storyID);
          }
        } else if (visibility == 2) {
          const isCloseFriend = await followManager.isCloseFriend(
            userID,
            uploaderUserID
          );
          if (isCloseFriend) {
            filteredPost.push(storyID);
          }
        }
      }
    });

    await Promise.all(promises);

    return filteredPost;
  }

  async getUploaderID(storyID) {
    try {
      const query = "Select userID from story where storyID = ?";
      const [result] = await select(query, [storyID]);
      return result ? result["userID"] : null;
    } catch (error) {
      return error;
    }
  }

  async getVisibility(storyID) {
    try {
      const query = "Select storyVisibility from story where storyID = ?";
      const [result] = await select(query, [storyID]);
      return result ? result["storyVisibility"] : null;
    } catch (error) {
      return error;
    }
  }

  async addDetails(storyIDs) {
    try {
      const query = `SELECT users.userID, users.username, users.profileIcon, (JSON_ARRAYAGG(JSON_OBJECT('id', storyID, 'isVideo', isVideo, 'url', storyLink, 'uploadDate', uploadDate, 'isCloseFriend', storyVisibility = 2))) AS stories, MAX(storyVisibility) = 2 AS hasCloseFriend FROM instabun.story INNER JOIN users ON users.userID = story.userID WHERE story.storyID IN (?) GROUP BY story.userID ORDER BY CASE WHEN story.userID = 1 THEN 1 ELSE 0 END DESC;`;
      const result = await select(query, [storyIDs]);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = StoryManager;
