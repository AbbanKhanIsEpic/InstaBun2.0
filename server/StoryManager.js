const { select, update } = require("./DB");
const FollowManager = require("./FollowManager");

class StoryManager {
  async upload(userID, StoryLink, Title, isVideo) {
    try {
      const query = `INSERT INTO instabun.Story (UserID,isVideo,StoryLink,Title,uploadDateTime) VALUES (?, ?, ?, ?,now());`;
      await update(query, [userID, isVideo, StoryLink, Title]);
      return "Upload story operation successful";
    } catch (error) {
      return error;
    }
  }

  //Used for naming convensation
  //So there will be no overridden in firebase
  async total(userID) {
    try {
      const query = `SELECT count(*) FROM instabun.Story where UserID = ?;`;
      const [result] = await select(query, [userID]);
      return result["count(*)"];
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
              AND FollowingID = Users.UserID)
              OR (FollowerID = Users.UserID
              AND FollowingID = ?))
          AS Status,
        Story.isVideo,
        Story.UserID,
        Story.idStory,
        Story.StoryLink,
        Story.Title,
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
