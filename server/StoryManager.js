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
      const query = `With filterStories as (
	Select *, (SELECT 
          COUNT(*)
            FROM
            followers
            WHERE
              (followers.followerID = ?
              AND FollowingID = story.userID)
              OR (FollowerID = story.userID
              AND FollowingID = ?))
          AS Status from story
          WHERE timestampdiff(hour,uploadDate,now()) <= 24
          HAVING storyVisibility <= status OR userID = ?
)
select users.userID, users.username, users.profileIcon,(json_arrayagg(JSON_OBJECT('id',
                    storyID,
                    'isVideo',
                    isVideo,
                    'url',
                    storyLink,
                    'uploadDate',
                    uploadDate, 
                    'visibility',storyVisibility))) as stories, MAX(storyVisibility) = 2 as hasCloseFriend from filterStories INNER JOIN users on users.userID = filterStories.userID GROUP BY filterStories.userID ORDER BY CASE WHEN users.userID = ? THEN 1 ELSE 0 END DESC`;
      const result = await select(query, [userID, userID, userID, userID]);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = StoryManager;
