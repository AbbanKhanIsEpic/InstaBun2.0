//Imports
const { select, update } = require("./DB.js");

class GroupManager {
  //Create a new group
  async createGroup(createrUserID, groupName, groupProfileIcon, groupMembers) {
    try {
      const query = `INSERT INTO instabun.community (ownerID groupName,groupProfileIcon) VALUES (?,?,?);`;
      await update(query, [createrUserID, groupName, groupProfileIcon]);
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
  async removeMemeber(groupID, groupMemberID) {
    try {
      const query = `DELETE FROM GroupMembers WHERE (GroupID = ?) AND (UserID = ?);`;
      await update(query, [groupID, groupMemberID]);
      return "Remove member operation successful";
    } catch (error) {
      return error;
    }
  }

  //Get the latest group's id
  async #getLatestGroupID(createrUserID) {
    try {
      const query = `SELECT groupID FROM instabun.community WHERE ownerID = ? Order by groupID DESC LIMIT 1;`;
      const [result] = await select(query, [createrUserID]);
      return result["groupID"];
    } catch (error) {
      return error;
    }
  }

  //Return a list users who are members of the group (groupID)
  async getGroupMembers(groupID) {
    try {
      const query = `SELECT Users.UserID, Users.Username, Users.DisplayName, Users.ProfileIconLink FROM instabun.GroupMembers
    INNER JOIN
     Users ON Users.UserID = GroupMembers.UserID
    INNER JOIN
     Collective ON Collective.GroupID = GroupMembers.GroupID
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
      const query = `UPDATE community SET OwnerID = ? WHERE (GroupID = ?);`;
      await update(query, [newOwnerID, groupID]);
      return "Transfer ownership operation successful";
    } catch (error) {
      return error;
    }
  }

  //Remove everything related to the group(groupID)
  async deleteGroup(groupID, groupMembers) {
    try {
      const groupMessage = new GroupMessage();
      await groupMessage.deleteGroupMessages(groupID);
      await groupMessage.deleteClearMessages(groupID);
      for (const groupMember of groupMembers) {
        await this.removeMemeber(groupID, groupMember);
      }
      const query = `DELETE FROM community WHERE (GroupID = ?);`;
      await update(query, [groupID]);
      return "Delete group operation successful";
    } catch (error) {
      return error;
    }
  }
}

module.exports = GroupManager;
