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
      const follow = new FollowManager();
      const followingArray = await follow.getFollowings(userID);
      if (followingArray.length === 0) {
        return new Error(
          "Can not get stories of users when user follows no one"
        );
      }
      const query = `SELECT 
        timestampdiff(HOUR,Story.uploadDateTime,now()) as hoursOlD,
        Users.Visibility,
        (SELECT 
          COUNT(*)
            FROM
            instabun.Follows
            WHERE
              (FollowerID = ?
              AND FollowingID = Users.userID)
              OR (FollowerID = Users.userID
              AND FollowingID = ?))
          AS Status,
        Story.isVideo,
        Story.userID,
        Story.storyID,
        Story.storyLink,
        Users.ProfileIconLink
    FROM
        Story
            INNER JOIN
        Users ON Users.UserID = Story.UserID
    WHERE
        Story.UserID in (?)
        HAVING Status >= Users.Visibility AND hoursOlD <= 24
   Order by hoursOlD;`;

      const result = await select(query, [userID, userID, followingArray]);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = StoryManager;
