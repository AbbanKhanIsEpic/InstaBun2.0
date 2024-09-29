const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");
const FollowManager = require("./FollowManager.js");
const UserManager = require("./UserManager.js");

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
  async getFollowingStory(userID) {
    try {
      //Manager
      const followManager = new FollowManager();
      const userManager = new UserManager();

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

      if (!storyIDs.length) {
        return new Error("There are  no stories");
      }

      const filteredStoryIDs = await this.filter(userID, storyIDs);

      if (!filteredStoryIDs.length) {
        return new Error("There are  no stories");
      }

      const stories = await this.getStories(userID, filteredStoryIDs);

      const promises = stories.map(async (story) => {
        const uploaderUserID = story["userID"];
        const [username, profileIcon] = await Promise.all([
          userManager.getUsername(uploaderUserID),
          userManager.getProfileIcon(uploaderUserID),
        ]);
        return {
          userID: uploaderUserID,
          username: username,
          profileIcon: profileIcon,
          hasCloseFriend: story["hasCloseFriend"],
          stories: story["stories"],
        };
      });

      const compeleteStories = await Promise.all(promises);

      console.log(compeleteStories);

      return compeleteStories;
    } catch (error) {
      return error;
    }
  }

  //Filter if the user can view the story
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
        if (
          await followManager.isVisibleToUser(
            userID,
            uploaderUserID,
            visibility
          )
        ) {
          filteredPost.push(storyID);
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

  async getStories(userID, storyIDs) {
    try {
      const query = `SELECT story.userID, (JSON_ARRAYAGG(JSON_OBJECT('id', storyID,'isVideo', isVideo,'url', storyLink,'uploadDate', uploadDate,'isCloseFriend', (storyVisibility = 2)))) AS stories, CASE WHEN MAX(storyVisibility) = 2 THEN 1 ELSE 0 END AS hasCloseFriend FROM instabun.story WHERE story.storyID IN (?) GROUP BY story.userID  ORDER BY CASE WHEN story.userID = ? THEN 1 ELSE 0 END DESC,MAX(uploadDate) DESC;`;
      const result = await select(query, [storyIDs, userID]);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = StoryManager;
