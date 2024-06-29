//Import
const { select, update } = require("./DB");
const UserManager = require("./UserManager");

class DirectMessage {
  //Save the message to database
  async sendMessage(senderID, receiverID, message) {
    try {
      const query = `
        INSERT INTO instabun.DirectMessages (SenderID, RecieverID, Time, Message)
        VALUES (?, ?, NOW(), ?);`;
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

  //Check if either of them has blocked each other
  //If so: user can not send message
  //If not: check if there is a DM limit
  //If pass the dm limit: user can send message
  async hasAbilityToSend(senderID, receiverID) {
    try {
      const user = new UserManager();
      let hasSenderBlock = await user.isUserBlocked(receiverID, senderID);
      if (!hasSenderBlock) {
        let hasReceiverBlock = await user.isUserBlocked(senderID, receiverID);
        if (!hasReceiverBlock) {
          //Since the DM limit is:
          //0 -> Everyone
          //1 -> Followers
          //2 -> Mutural / Friends
          //3 -> No one
          //It is easy to do comparison with counting who follow who
          //0 -> Neither of them follow each other
          //1 -> Only one of them follows
          //2 -> Both of them follow each other
          //3 -> Impossible
          const receiverDMLimit = await user.getDMLimit(receiverID);
          const query = `SELECT COUNT(*) FROM instabun.Follows WHERE FollowerID = ? AND FollowingID = ? OR FollowerID = ? AND FollowingID = ?;`;
          const [status] = (
            await select(query, [senderID, receiverID, receiverID, senderID])
          )["COUNT(*)"];
          if (status >= receiverDMLimit) {
            return true;
          }
        }
      }
      return false;
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
