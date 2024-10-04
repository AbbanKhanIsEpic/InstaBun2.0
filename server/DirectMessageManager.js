//Import
const { select, update } = require("./DB.js");
const BlockManager = require("./BlockManager.js");
const UserManager = require("./UserManager.js");
const FollowManager = require("./FollowManager.js");

class DirectMessageManager {
  //Save the message to database
  async sendMessage(senderID, receiverID, message) {
    try {
      const canMessage = await this.canUserMessage(senderID, receiverID);
      if (!canMessage) {
        return new Error("Can not send message beacause dm limit");
      }
      const query = `INSERT INTO directmessage (senderID,receiverID,message) VALUES (?, ?, ?);`;
      await update(query, [senderID, receiverID, message]);
      return "Send message operation successful";
    } catch (error) {
      return error;
    }
  }

  //Remove the message from the database
  async deleteMessage(messageID) {
    try {
      const query = `DELETE FROM directmessage WHERE (messageID = ?);`;
      await update(query, [messageID]);
      return "Delete direct message operation successful";
    } catch (error) {
      return error;
    }
  }

  //Returns latest message
  async getLatestMessage(senderID, receiverID) {
    try {
      const clearMessageTime =
        (await this.getWhenMessageCleared(senderID, receiverID)) || 0; //This is because there is a case where time is null and MySQL does not return anything when comparing with null

      const query = `SELECT *  FROM instabun.directmessage  WHERE time > ?  AND ((senderID = ? AND receiverID = ?) OR (senderID = ? AND receiverID = ?)) ORDER BY messageID DESC LIMIT 1;`;

      const [result] = await select(query, [
        clearMessageTime,
        senderID,
        receiverID,
        receiverID,
        senderID,
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //Get a list of people who the user has communicated with
  async #getMessagePartnerIDs(userID) {
    try {
      const query =
        "SELECT distinct CASE WHEN senderID = ? THEN receiverID ELSE senderID END as id FROM directmessage WHERE senderID = ? OR receiverID = ? ORDER BY messageID DESC;";

      const result = await select(query, [userID, userID, userID]);

      return result ? result.map((element) => element["id"]) : [];
    } catch (error) {
      return error;
    }
  }

  async #filterByDMLimit(senderID, receiverIDs, include = true) {
    try {
      const filtered = [];
      for (const receiverID of receiverIDs) {
        const canMessage = await this.canUserMessage(senderID, receiverID);
        if (canMessage == include) {
          filtered.push(receiverID);
        }
      }
      return filtered;
    } catch (error) {
      return error;
    }
  }

  //Get list of people who has communicated with the user
  //This will only include messages between two users if either of them are blocked
  //Also include messages that the other party's dm limit is greater than the relationship both have
  async getHiddenList(userID) {
    try {
      //Managers :D
      const userManager = new UserManager();
      const blockManager = new BlockManager();

      //Get a list of people who the user has communicated with
      const communicatedWithList = await this.#getMessagePartnerIDs(userID);

      const canCommunicatedWithList = await this.#filterByDMLimit(
        userID,
        communicatedWithList
      );

      // Filter out blocked users
      const filteredList = [];

      for (const messagedUserID of canCommunicatedWithList) {
        const isCurrentUserBlocked = await blockManager.isUserBlocked(
          messagedUserID,
          userID
        );
        const isMessagedUserBlocked = await blockManager.isUserBlocked(
          userID,
          messagedUserID
        );

        if (!(isMessagedUserBlocked || isCurrentUserBlocked)) {
          continue; // Skip non-blocked users
        }

        // Fetch additional user data concurrently
        const [displayName, profileIcon, latestMessage] = await Promise.all([
          userManager.getDisplayName(messagedUserID),
          userManager.getProfileIcon(messagedUserID),
          this.getLatestMessage(userID, messagedUserID),
        ]);

        const senderName = await userManager.getDisplayName(
          latestMessage.senderID
        );

        latestMessage["senderName"] = senderName;

        const clearMessageTime =
          (await this.getWhenMessageCleared(userID, messagedUserID)) || 0;

        filteredList.push({
          id: messagedUserID,
          icon: profileIcon,
          name: displayName,
          senderID: latestMessage["senderID"],
          senderName: latestMessage["senderName"],
          message: latestMessage["message"],
          time:
            latestMessage["time"] > clearMessageTime
              ? latestMessage["time"]
              : clearMessageTime,
        });
      }

      const dmLimitReachedUsers = await this.#filterByDMLimit(
        userID,
        communicatedWithList,
        false
      );

      for (const messagedUserID of dmLimitReachedUsers) {
        // Fetch additional user data concurrently
        const [displayName, profileIcon, latestMessage] = await Promise.all([
          userManager.getDisplayName(messagedUserID),
          userManager.getProfileIcon(messagedUserID),
          this.getLatestMessage(userID, messagedUserID),
        ]);

        const senderName = await userManager.getDisplayName(
          latestMessage.senderID
        );

        latestMessage["senderName"] = senderName;

        const clearMessageTime =
          (await this.getWhenMessageCleared(userID, messagedUserID)) || 0;

        filteredList.push({
          id: messagedUserID,
          icon: profileIcon,
          name: displayName,
          senderID: latestMessage["senderID"],
          senderName: latestMessage["senderName"],
          message: latestMessage["message"],
          time:
            latestMessage["time"] > clearMessageTime
              ? latestMessage["time"]
              : clearMessageTime,
        });
      }

      // Use filteredList for further processing or return it
      return filteredList;
    } catch (error) {
      return error;
    }
  }

  //Get list of people who has communicated with the user
  //This will only exlude messages between two users if either of them are blocked
  async getDirectList(userID) {
    try {
      //Managers :D
      const userManager = new UserManager();
      const blockManager = new BlockManager();

      //Get a list of people who the user has communicated with
      const communicatedWithList = await this.#getMessagePartnerIDs(userID);

      if (!communicatedWithList || !communicatedWithList.length) {
        return new Error("User has talked to no one");
      }

      const canCommunicatedWithList = await this.#filterByDMLimit(
        userID,
        communicatedWithList
      );

      // Filter out blocked users
      const filteredList = [];

      for (const messagedUserID of canCommunicatedWithList) {
        console.log(messagedUserID);
        const isCurrentUserBlocked = await blockManager.isUserBlocked(
          messagedUserID,
          userID
        );
        const isMessagedUserBlocked = await blockManager.isUserBlocked(
          userID,
          messagedUserID
        );

        if (isMessagedUserBlocked || isCurrentUserBlocked) {
          continue; // Skip blocked users
        }

        // Fetch additional user data concurrently
        const [username, displayName, profileIcon, latestMessage] =
          await Promise.all([
            userManager.getUsername(messagedUserID),
            userManager.getDisplayName(messagedUserID),
            userManager.getProfileIcon(messagedUserID),
            this.getLatestMessage(userID, messagedUserID),
          ]);

        const senderName = latestMessage
          ? await userManager.getDisplayName(latestMessage?.["senderID"])
          : "";

        const clearMessageTime =
          (await this.getWhenMessageCleared(userID, messagedUserID)) || 0;

        filteredList.push({
          id: messagedUserID,
          username: username,
          icon: profileIcon,
          name: displayName,
          senderID: latestMessage ? latestMessage?.["senderID"] : "",
          senderName: senderName,
          message: latestMessage ? latestMessage?.["message"] : "",
          time: new Date(
            Math.max(
              new Date(latestMessage ? latestMessage?.["time"] : 0),
              new Date(clearMessageTime)
            )
          ),
        });
      }
      console.log(filteredList);
      return filteredList;
    } catch (error) {
      return error;
    }
  }

  //Get the messages
  async getMessage(senderID, receiverID) {
    try {
      const clearMessageTime =
        (await this.getWhenMessageCleared(senderID, receiverID)) || 0;

      const query = `SELECT directmessage.* FROM directmessage WHERE time > ?  AND ((senderID = ? AND receiverID = ?) OR (senderID = ? AND receiverID = ?)) ORDER BY time;`;
      const result = await select(query, [
        clearMessageTime,
        senderID,
        receiverID,
        receiverID,
        senderID,
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }
  //Save when the user cleared the message
  //Does not actually clear the message (will just appear as if on the client side of who wanted to clear the message)
  async clearMessage(senderID, receiverID) {
    try {
      const hasUserClearBefore = await this.#hasClearedMessageBefore(
        senderID,
        receiverID
      );
      console.log(hasUserClearBefore);
      if (hasUserClearBefore) {
        const updateQuery = `UPDATE ClearDirectMessage SET Time = now() WHERE (SenderID = ?) and (receiverID = ?);`;
        update(updateQuery, [senderID, receiverID]);
      } else {
        const createQuery = `INSERT INTO ClearDirectMessage (SenderID, receiverID, Time) VALUES (?,?,now());`;
        update(createQuery, [senderID, receiverID]);
      }
    } catch (error) {
      return error;
    }
  }

  //Check if the user has cleared the message on their side before
  async #hasClearedMessageBefore(senderID, receiverID) {
    try {
      const query = `SELECT count(*) FROM instabun.ClearDirectMessage WHERE SenderID = ? AND receiverID = ?;`;
      const [result] = await select(query, [senderID, receiverID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Returns the time when user cleared the message
  async getWhenMessageCleared(senderID, receiverID) {
    try {
      const query = `SELECT time FROM cleardirectmessage where senderID = ? AND receiverID = ?;`;
      const [result] = await select(query, [senderID, receiverID]);
      return result ? result["time"] : null;
    } catch (error) {
      return error;
    }
  }

  //Checks if user can message the user
  async canUserMessage(requestingUserID, targetUserID) {
    try {
      //Managers
      const userManager = new UserManager();
      const followManager = new FollowManager();
      const blockManager = new BlockManager();

      const isBlocked = await blockManager.isUserBlocked(
        targetUserID,
        requestingUserID
      );

      const hasBlocked = await blockManager.isUserBlocked(
        requestingUserID,
        targetUserID
      );

      if (isBlocked || hasBlocked) {
        return false;
      }

      const dmLimit = await userManager.getDMLimit(targetUserID);
      if (dmLimit == 0) {
        return true;
      } else if (dmLimit == 1) {
        const isFollowing = followManager.isFollowing(
          requestingUserID,
          targetUserID
        );
        return isFollowing;
      } else if (dmLimit == 2) {
        const isCloseFriend = followManager.isCloseFriend(
          requestingUserID,
          targetUserID
        );
        return isCloseFriend;
      }
      return false;
    } catch (error) {
      return error;
    }
  }
}

module.exports = DirectMessageManager;
