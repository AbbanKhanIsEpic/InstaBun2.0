//Imports
const { select, update } = require("./DB");

class GroupMessage {
  //Return the messages of the group
  async getMessage(userID, groupID, messageID) {
    try {
      const query = `SELECT GroupMessages.*, Users.DisplayName,Users.Username, Users.ProfileIconLink FROM GroupMessages
      INNER JOIN
        Users ON Users.UserID = GroupMessages.UserID
      LEFT JOIN
        ClearGroupMessage ON ClearGroupMessage.GroupID = ? AND ClearGroupMessage.UserID = ?
      WHERE
        GroupMessages.GroupID = ?
          AND MessageID > ?
          AND (ClearGroupMessage.Time IS NULL
          OR ClearGroupMessage.Time < GroupMessages.Time);`;
      const result = await select(query, [groupID, userID, groupID, messageID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //Remove the message
  async deleteMessage(messageID) {
    try {
      const query = `DELETE FROM GroupMessages WHERE MessageID = ?;`;
      await update(query, [messageID]);
      return "Delete message operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save the message
  async sendMessage(userID, groupID, message) {
    try {
      const query = `INSERT INTO abbankDB.GroupMessages (UserID, GroupID, Time, Message) VALUES (?, ?, now(), ?);`;
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
}

module.exports = GroupMessage;
