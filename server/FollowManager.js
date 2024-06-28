//Import
const { select, update } = require("./DB");

class FollowManager {
  //Save that the user (follwerID) is following the user(followingID)
  async follow(followerID, followingID) {
    try {
      const query = `INSERT INTO abbankDB.Follows (FollowerID, FollowingID) VALUES (?, ?);`;
      await update(query, [followerID, followingID]);
      return "Follow operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save that the user (follwerID) is no more following the user(followingID)
  async unfollow(followerID, followingID) {
    try {
      const query = `DELETE FROM abbankDB.Follows WHERE (FollowerID =?) and (FollowingID = ?);`;
      await update(query, [followerID, followingID]);
      return "Unfollow operation successful";
    } catch (error) {
      return error;
    }
  }

  //Check if the user(followerID) is following user(followingID)
  async isFollowing(followerID, followingID) {
    try {
      const query = `SELECT count(*) FROM abbankDB.Follows where FollowerID = ? AND FollowingID = ?;`;
      const [result] = await select(query, [followerID, followingID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Return an array of users' ID of user(followingID) who the user follows
  async getFollowings(followerID) {
    try {
      const query = `SELECT FollowingID FROM abbankDB.Follows where FollowerID = ?;`;
      const result = await select(query, [followerID]);
      //Convert JSON to array for easy reading
      const followings = result.map((row) => row.FollowingID);
      return followings;
    } catch (error) {
      return error;
    }
  }

  //Return an array of users' ID of user who follows the user(followingID)
  async getFollowers(followingID) {
    try {
      const query = `SELECT FollowerID FROM abbankDB.Follows where FollowingID = ?;`;
      const result = await select(query, [followingID]);
      //Convert JSON to array for easy reading
      const followers = result.map((row) => row.FollowerID);
      return followers;
    } catch (error) {
      return error;
    }
  }
}

module.exports = FollowManager;
