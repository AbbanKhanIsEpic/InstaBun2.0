//Import
const { select, update } = require("./DB");
const BlockManager = require("./BlockManager.js");
const UserManager = require("./UserManager.js");

class DirectMessage {
  //Save the message to database
  async sendMessage(senderID, receiverID, message) {
    try {
      const query = `
        INSERT INTO instabun.DirectMessages (SenderID, RecieverID, Message)
        VALUES (?, ?, ?);`;
      await update(query, [senderID, receiverID, message]);
      return "Send message operation successful";
    } catch (error) {
      return error;
    }
  }

  //Remove the message from the database
  async deleteMessage(messageID) {
    try {
      const query = `DELETE FROM DirectMessages WHERE MessageID = ?;
      `;
      await update(query, [messageID]);
      return "Delete message operation successful";
    } catch (error) {
      return error;
    }
  }

  //Get list of people who has communicated with the user
  async getDirectList(userID) {
    try {
      const user = new UserManager();

      const query = `
      SELECT distinct RecieverID FROM DirectMessages WHERE SenderID = ? 
      UNION 
      SELECT distinct SenderID FROM DirectMessages WHERE RecieverID = ?;`;
      const dmList = await select(query, [userID, userID]);

      const directList = [];

      const directListPromises = dmList.map(async (interaction) => {
        const recipientID = interaction["RecieverID"];
        try {
          const [profileIcon, displayName, username] = await Promise.all([
            user.getUserProfileIconLink(recipientID),
            user.getDisplayName(recipientID),
            user.getUsername(recipientID),
          ]);
          directList.push({
            userID: recipientID,
            profileIconLink: profileIcon,
            displayName: displayName,
            username: username,
          });
        } catch (error) {
          throw error;
        }
      });

      await Promise.all(directListPromises);

      return directList;
    } catch (error) {
      return error;
    }
  }

  //Get the messages
  async getMessage(senderID, recieverID, messageID) {
    try {
      const query = `
    SELECT DirectMessages.*, Users.Username FROM DirectMessages 
    INNER JOIN
        Users ON Users.UserID = DirectMessages.SenderID
    LEFT JOIN
      ClearDirectMessage ON ClearDirectMessage.SenderID = ? AND ClearDirectMessage.RecieverID = ?
    WHERE
    (DirectMessages.SenderID = ?
        AND DirectMessages.RecieverID = ?
        OR DirectMessages.SenderID = ?
        AND DirectMessages.RecieverID = ?)
        AND DirectMessages.MessageID > ?
        AND (ClearDirectMessage.Time IS NULL OR ClearDirectMessage.Time < DirectMessages.Time);`;

      const messages = await select(query, [
        senderID,
        recieverID,
        senderID,
        recieverID,
        recieverID,
        senderID,
        messageID,
      ]);

      return messages;
    } catch (error) {
      return error;
    }
  }

  //Save when the user cleared the message
  //Does not actually clear the message (will just appear as if on the client side of who wanted to clear the message)
  async clearMessage(senderID, recieverID) {
    try {
      const hasUserClearBefore = await this.#hasClearedMessageBefore(
        senderID,
        recieverID
      );
      if (hasUserClearBefore) {
        const updateQuery = `UPDATE ClearDirectMessage SET Time = now() WHERE (SenderID = ?) and (RecieverID = ?);`;
        update(updateQuery, [senderID, recieverID]);
      } else {
        const createQuery = `INSERT INTO ClearDirectMessage (SenderID, RecieverID, Time) VALUES (?,?,now());`;
        update(createQuery, [senderID, recieverID]);
      }
    } catch (error) {
      return error;
    }
  }

  //Check if the user has cleared the message on their side before
  async #hasClearedMessageBefore(senderID, recieverID) {
    try {
      const query = `SELECT count(*) FROM instabun.ClearDirectMessage WHERE SenderID = ? AND RecieverID = ?;`;
      const [result] = await select(query, [senderID, recieverID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }
}

module.exports = DirectMessage;
