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
    console.log(userID);
    try {
      const query = `WITH getLatestStories AS (
  SELECT story.storyID,story.userID, story.storyVisibility, (SELECT 
          COUNT(*)
            FROM
            followers
            WHERE
              (followers.followerID = ?
              AND FollowingID = Users.userID)
              OR (FollowerID = Users.userID
              AND FollowingID = ?)
          AS Status, ROW_NUMBER() OVER (PARTITION BY story.userID ORDER BY uploadDate DESC) AS latest
  FROM story
 LEFT JOIN block ON block.blockerUserID = ?
 INNER JOIN users on users.userID = story.userID HAVING story.storyVisibility >= status
 )

  Select getLatestStories.userID, users.username, users.displayName, ((SELECT 
    JSON_ARRAYAGG(JSON_OBJECT('id',
                    storyID,
                    'isVideo',
                    isVideo,
                    'url',
                    storyLink,
                    'uploadDate',
                    uploadDate)) 
FROM
    story
       WHERE 
        story.userID = getLatestStories.userID
    ORDER BY uploadDate)) as stories from story INNER JOIN
    users ON users.userID = story.userID JOIN getLatestStories ON getLatestStories.storyID = story.storyID Where latest = 1`;
      const result = await select(query, [userID, userID, userID]);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = StoryManager;
