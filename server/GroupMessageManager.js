//Imports
const { select, update } = require("./DB.js");
const UserManager = require("./UserManager.js");

class GroupMessageManager {
  //Return the messages of the group
  async getMessage(userID, groupID) {
    try {
      //Manager
      const userManager = new UserManager();

      //Get when message was cleared
      const clearMessageTime =
        (await this.getWhenMessageCleared(groupID, userID)) || 0;

      //Get the messages
      const query = `SELECT * FROM groupMessages WHERE groupID = ? AND messageID > ? AND time > ?;`;
      const result = await select(query, [groupID, userID, clearMessageTime]);

      //Add display name and profile icon to each of the sender
      for (const [index, { senderID: senderID }] of result.entries()) {
        const [displayName, profileIcon] = await Promise.all([
          userManager.getDisplayName(senderID),
          userManager.getProfileIcon(senderID),
        ]);

        result[index]["displayName"] = displayName;
        result[index]["profileIcon"] = profileIcon;
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  //Remove the message
  async deleteMessage(messageID) {
    try {
      const query = `DELETE FROM groupMessages WHERE messageID = ?;`;
      await update(query, [messageID]);
      return "Delete message operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save the message
  async sendMessage(userID, groupID, message) {
    try {
      const query = `INSERT INTO groupMessages (UserID, GroupID, Message) VALUES (?, ?,?);`;
      await update(query, [userID, groupID, message]);
      return "Send message operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save when the user cleared the message
  //Does not actually clear the message (will just appear as if on the client side of who wanted to clear the message)
  async clearMessage(userID, groupID) {
    try {
      const hasUserClearBefore = await this.#hasClearedMessageBefore(
        userID,
        groupID
      );
      if (hasUserClearBefore) {
        const updateQuery = `UPDATE ClearGroupMessage SET Time = now() WHERE (UserID = ?) and (GroupID = ?);`;
        await update(updateQuery, [userID, groupID]);
      } else {
        const createQuery = `INSERT INTO ClearGroupMessage (UserID, GroupID, Time) VALUES (?, ?, now());`;
        await update(createQuery, [userID, groupID]);
      }
    } catch (error) {
      return error;
    }
  }

  //Check if the user has cleared the message on their side before
  async #hasClearedMessageBefore(userID, groupID) {
    try {
      const query = `SELECT count(*) FROM ClearGroupMessage WHERE UserID = ? AND GroupID = ?;`;
      const [result] = await select(query, [userID, groupID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //When group owner deletes the group
  //Everything related to the group has to be deleted first
  //Before the group can be deleted because of foreign key
  async deleteGroupMessages(groupID) {
    try {
      const query = `DELETE FROM GroupMessages WHERE (GroupID = ?);`;
      await update(query, [groupID]);
      return "Delete group messages operation successful";
    } catch (error) {
      return error;
    }
  }

  //When group owner deletes the group
  //Everything related to the group has to be deleted first
  //Before the group can be deleted because of foreign key
  async deleteClearMessages(groupID) {
    try {
      const query = `DELETE FROM ClearGroupMessage WHERE (GroupID = ?);`;
      await update(query, [groupID]);
      return "Delete clear messages operation successful";
    } catch (error) {
      return error;
    }
  }

  //Returns when user cleared the group messages
  async getWhenMessageCleared(groupID, userID) {
    try {
      const query = `SELECT time FROM cleargroupmessage where userID = ? AND groupID = ?;`;
      const [result] = await select(query, [groupID, userID]);
      return result["time"];
    } catch (error) {
      return error;
    }
  }

  //Returns a list of groups
  async getGroupList(userID) {
    try {
      //Manager
      const userManager = new UserManager();
      //Get when message was cleared
      const groupIDList = (await this.getGroupIDList(userID)).map(
        (g) => g.groupID
      );
      //Since null returns nothing -> user not being in a group will return NULL -> return nothing
      if (!groupIDList.length) {
        return [];
      }

      //Get group that has no messages
      const query = `SELECT groupID as id, groupName as name, groupIcon as icon, groupCreationDate as time FROM groupdb where groupID IN (?)`;

      const result = await select(query, [groupIDList]);

      for (const [index, { id: groupID }] of result.entries()) {
        // Fetch additional user data concurrently
        const latestMessage = await this.getLatestMessage(groupID, userID);

        const senderID = latestMessage.senderID;
        const senderName =
          senderID != null ? await userManager.getDisplayName(senderID) : null;

        const clearMessageTime =
          (await this.getWhenMessageCleared(groupID, userID)) || 0;

        result[index]["senderID"] = latestMessage["userID"];
        result[index]["senderName"] = senderName;
        result[index]["message"] = latestMessage["userID"];
        result[index]["time"] =
          latestMessage["time"] != null
            ? Math.max(latestMessage["time"], clearMessageTime)
            : result[index]["time"];
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  //Returns a list of groupID that the user is in
  async getGroupIDList(userID) {
    try {
      const query = "Select groupID from groupMembers where memberID = ?";
      const result = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //Returns the latest message
  async getLatestMessage(groupID, userID) {
    try {
      try {
        const clearMessageTime =
          (await this.getWhenMessageCleared(groupID, userID)) || 0;

        const query = `SELECT *  FROM groupmessages  WHERE time > ?  AND groupID = ? ORDER BY messageID DESC LIMIT 1;`;

        const [result] = await select(query, [clearMessageTime, groupID]);
        return result;
      } catch (error) {
        return error;
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = GroupMessageManager;
