//Imports
const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");
const UserManager = require("./UserManager.js");
const GroupMessageManager = require("./GroupMessageManager");

class GroupManager {
  //Create a new group
  async createGroup(createrUserID, groupName, file, groupMembers) {
    try {
      const buffer = file.buffer;
      const fileName = sha1(buffer);
      const url = "groupIcon/" + fileName;
      const mimetype = file.mimetype;

      const firebaseStorageManager = new FirebaseStorageManager();
      const firebaseURL = await firebaseStorageManager.uploadFile(
        buffer,
        url,
        mimetype
      );

      const query = `INSERT INTO instabun.groupdb (ownerID, groupName,groupIcon) VALUES (?,?,?);`;
      await update(query, [createrUserID, groupName, firebaseURL]);
      //Since user just created the group
      //The latest groupID will be the group that just been created
      const groupID = await this.#getLatestGroupID(createrUserID);
      for (const groupMember of groupMembers) {
        await this.addMember(groupID, groupMember);
      }
    } catch (error) {
      return error;
    }
  }

  //Add member to the group
  async addMember(groupID, groupMemberID) {
    try {
      const query = `INSERT INTO groupMembers (groupID, memberID) VALUES (?, ?);`;
      await update(query, [groupID, groupMemberID]);
      return "Add member operation successful";
    } catch (error) {
      return error;
    }
  }

  //Remove member to the group
  async removeMember(groupID, groupMemberID) {
    try {
      const query = `DELETE FROM GroupMembers WHERE (GroupID = ?) AND (memberID = ?);`;
      await update(query, [groupID, groupMemberID]);
      return "Remove member operation successful";
    } catch (error) {
      return error;
    }
  }

  //Get the latest group's id
  async #getLatestGroupID(createrUserID) {
    try {
      const query = `SELECT groupID FROM instabun.groupdb WHERE ownerID = ? Order by groupID DESC LIMIT 1;`;
      const [result] = await select(query, [createrUserID]);
      return result["groupID"];
    } catch (error) {
      return error;
    }
  }

  //Returns a list of groups
  async getGroupList(userID) {
    try {
      //Manager
      const userManager = new UserManager();
      const groupMessageManager = new GroupMessageManager();
      //Get when message was cleared
      const groupIDList = await this.getGroupIDList(userID);
      //Since null returns nothing -> user not being in a group will return NULL -> return nothing
      if (!groupIDList || !groupIDList.length) {
        return [];
      }

      //Get group that has no messages
      const query = `SELECT groupID as id, groupName as name, groupIcon as icon, groupCreationDate as time FROM groupdb where groupID IN (?)`;

      const result = await select(query, [groupIDList]);

      for (const [index, { id: groupID }] of result.entries()) {
        // Fetch additional user data concurrently
        const latestMessage = await groupMessageManager.getLatestMessage(
          groupID,
          userID
        );

        const hasLastMessage = latestMessage?.["messageID"] ? true : false;

        const senderID = hasLastMessage ? latestMessage?.["senderID"] : null;

        const senderName = hasLastMessage
          ? await userManager.getDisplayName(senderID)
          : null;

        const message = hasLastMessage ? latestMessage?.["message"] : null;

        const clearMessageTime =
          await groupMessageManager.getWhenMessageCleared(groupID, userID);

        const time = hasLastMessage
          ? new Date(latestMessage?.["time"])
          : new Date(Math.max(result[index]["time"], clearMessageTime));

        result[index]["senderID"] = senderID;
        result[index]["senderName"] = senderName;
        result[index]["message"] = message;
        result[index]["time"] = time;
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
      return result ? result.map((groupID) => groupID?.["groupID"]) : [];
    } catch (error) {
      return error;
    }
  }

  //Return a list users who are members of the group (groupID)
  async getGroupMembers(groupID) {
    try {
      const query = `SELECT users.userID, users.username, users.displayName, users.profileIcon FROM instabun.GroupMembers
    INNER JOIN
     users ON users.userID = groupMembers.memberID
    INNER JOIN
     groupdb ON groupdb.groupID = GroupMembers.groupID
    WHERE
     GroupMembers.GroupID = ?;`;
      const groupMembers = await select(query, [groupID]);
      return groupMembers;
    } catch (error) {
      return error;
    }
  }

  //Transfer the ownership of the group(groupID) to the user(newOwnerID)
  async transferOwnership(groupID, newOwnerID) {
    try {
      const query = `UPDATE groupDB SET OwnerID = ? WHERE (GroupID = ?);`;
      await update(query, [newOwnerID, groupID]);
      return "Transfer ownership operation successful";
    } catch (error) {
      return error;
    }
  }

  //Remove everything related to the group(groupID)
  async deleteGroup(groupID, groupMembers) {
    try {
      const groupMessage = new GroupMessageManager();
      await groupMessage.deleteGroupMessages(groupID);
      await groupMessage.deleteClearMessages(groupID);
      for (const groupMember of groupMembers) {
        await this.removeMember(groupID, groupMember);
      }
      const query = `DELETE FROM community WHERE (GroupID = ?);`;
      await update(query, [groupID]);
      return "Delete group operation successful";
    } catch (error) {
      return error;
    }
  }

  async getOwnerID(groupID) {
    try {
      const query = "Select ownerID from groupDB where groupID = ?";
      const [result] = await select(query, [groupID]);
      return result ? result?.["ownerID"] : null;
    } catch (error) {
      return error;
    }
  }

  async updateGroupIcon(file, groupID) {
    try {
      const buffer = file.buffer;
      const fileName = sha1(buffer);
      const url = "groupIcon/" + fileName;
      const mimetype = file.mimetype;

      const firebaseStorageManager = new FirebaseStorageManager();
      const firebaseURL = await firebaseStorageManager.uploadFile(
        buffer,
        url,
        mimetype
      );

      const query = `UPDATE groupdb SET groupIcon = ? WHERE (groupID = ?)`;
      update(query, [firebaseURL, groupID]);
    } catch (error) {
      return error;
    }
  }

  async updateGroupName(groupName, groupID) {
    try {
      const query = `UPDATE groupdb SET groupName = ? WHERE (groupID = ?)`;
      update(query, [groupName, groupID]);
    } catch (error) {
      return error;
    }
  }
}

module.exports = GroupManager;
