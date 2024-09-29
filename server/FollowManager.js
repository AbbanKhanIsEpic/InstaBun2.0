//Import
const { select, update } = require("./DB.js");

class FollowManager {
  //Save that the user (follwerID) is following the user(followingID)
  async follow(followerID, followingID) {
    try {
      const query = `INSERT INTO instabun.followers (FollowerID, FollowingID) VALUES (?, ?);`;
      await update(query, [followerID, followingID]);
      return "Follow operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save that the user (follwerID) is no more following the user(followingID)
  async unfollow(followerID, followingID) {
    try {
      const query = `DELETE FROM instabun.followers WHERE (FollowerID =?) and (FollowingID = ?);`;
      await update(query, [followerID, followingID]);
      return "Unfollow operation successful";
    } catch (error) {
      return error;
    }
  }

  //Check if the requesting user following the target user
  async isFollowing(requestingUserID, targetUserID) {
    try {
      const query = `SELECT count(*) FROM instabun.followers where FollowerID = ? AND FollowingID = ?;`;
      const [result] = await select(query, [requestingUserID, targetUserID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Return an array of users' ID of user(followingID) who the user follows
  async getFollowings(followerID) {
    try {
      const query = `SELECT FollowingID FROM instabun.followers where FollowerID = ?;`;
      const result = await select(query, [followerID]);
      return result ? result.map((element) => element["FollowingID"]) : [];
    } catch (error) {
      return error;
    }
  }

  //Return an array of users' ID of user who follows the user(followingID)
  async getFollowers(followingID) {
    try {
      const query = `SELECT FollowerID FROM instabun.followers where FollowingID = ?;`;
      const result = await select(query, [followingID]);
      return result ? result.map((element) => element["FollowerID"]) : null;
    } catch (error) {
      return error;
    }
  }

  //Returns true or false if they are close friends
  async isCloseFriend(requestingUserID, targetUserID) {
    try {
      const query = `Select count(*) FROM followers WHERE (FollowingID = ? AND FollowerID = ?) OR (FollowingID = ? AND FollowerID = ?);`;
      const [result] = await select(query, [
        requestingUserID,
        targetUserID,
        targetUserID,
        requestingUserID,
      ]);
      return result["count(*)"] == 2;
    } catch (error) {
      return error;
    }
  }

  //Since if they were close friends, they both will be a follower and following of each other
  async getCloseFriend(userID) {
    try {
      const following = await this.getFollowings(userID);
      for (let i = 0; i < following.length; i++) {
        const followingUserID = following[i];
        const isCloseFriend = await this.isCloseFriend(userID, followingUserID);
        if (!isCloseFriend) {
          following.splice(i, 1);
        }
      }
      return following;
    } catch (error) {
      return error;
    }
  }

  async getTotalFollowing(userID) {
    try {
      const query = `SELECT count(*) FROM instabun.followers where FollowerID = ?`;
      const [result] = await select(query, [userID]);
      return result["count(*)"];
    } catch (error) {
      return error;
    }
  }

  async getTotalFollowers(userID) {
    try {
      const query = `SELECT count(*) FROM instabun.followers where FollowingID = ?`;
      const [result] = await select(query, [userID]);
      return result["count(*)"];
    } catch (error) {
      return error;
    }
  }

  async isVisibleToUser(requestingUserID, targetUserID, targetVisibility) {
    if (targetVisibility == 0) return true; // Public
    if (targetVisibility == 1)
      return await this.isFollowing(requestingUserID, targetUserID); // Followers
    if (targetVisibility == 2)
      return await this.isCloseFriend(requestingUserID, targetUserID); // Close Friends
    return false;
  }
}

module.exports = FollowManager;
