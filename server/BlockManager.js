const { select, update } = require("./DB.js");
const FollowManager = require("./FollowManager.js");

//What is a BlockManager
//It is a class that manages the blocking and unblocking of users
class BlockManager {
  //Check if user has been blocked
  async isUserBlocked(blockedUserID, blockerUserID) {
    try {
      const query = `SELECT count(*) FROM instabun.block where blockedUserID = ? AND blockerUserID = ?;`;
      const [result] = await select(query, [blockedUserID, blockerUserID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Blocks the user
  async block(blockerUserID, blockedUserID) {
    try {
      const query = `INSERT INTO block(blockerUserID,blockedUserID) VALUE(?,?);`;
      await update(query, [blockerUserID, blockedUserID]);
      //When user block someone, they want no association with them
      //So therefore, both party will stop following each other will not be following them
      const follow = new FollowManager();
      follow.unfollow(blockerUserID, blockedUserID);
      follow.unfollow(blockedUserID, blockerUserID);
      return "Block operation successful";
    } catch (error) {
      return error;
    }
  }

  //Removes the block
  async unblock(blockerUserID, blockedUserID) {
    try {
      const query = `DELETE FROM instabun.block WHERE blockerUserID = ? AND blockedUserID = ?;`;
      await update(query, [blockerUserID, blockedUserID]);
      return "Unblock operation successful";
    } catch (error) {
      return error;
    }
  }
}

module.exports = BlockManager;
