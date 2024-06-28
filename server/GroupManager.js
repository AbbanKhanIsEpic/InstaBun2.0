//Imports
const { select, update } = require("./DB");
const GroupMessage = require("./GroupMessage");

class GroupManager {
  //Return a list of groups that the user(userID) is in
  async getGroupList(userID) {
    try {
      const query = `
    SELECT Collective.OwnerID, Collective.GroupID,Collective.GroupName, Collective.GroupIconLink FROM GroupMembers
    INNER JOIN 
    Collective ON Collective.GroupID = GroupMembers.GroupID
    WHERE
        GroupMembers.UserID = ?;`;
      const result = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //Update the group's group icon
  async updateGroupIcon(groupID, groupIcon) {
    try {
      const query = `UPDATE Collective SET GroupIconLink = ? WHERE GroupID = ?;`;
      update(query, [groupIcon, groupID]);
      return "Update the group's icon operation successful";
    } catch (error) {
      return error;
    }
  }

  //Update the group's group name
  async updateGroupName(groupID, groupName) {
    try {
      const query = `UPDATE Collective SET GroupName = ? WHERE GroupID = ?;`;
      update(query, [groupName, groupID]);
      return "Update the group's name operation successful";
    } catch (error) {
      return error;
    }
  }

  //Create a new group
  async createGroup(createrUserID, groupName, groupIcon, groupMembers) {
    try {
      const query = `INSERT INTO Collective (OwnerID,GroupName, GroupIconLink) VALUES (?,?, ?);`;
      await update(query, [createrUserID, groupName, groupIcon]);
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
      const query = `INSERT INTO GroupMembers (GroupID, UserID) VALUES (?, ?);`;
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
      const query = `SELECT GroupID FROM abbankDB.Collective WHERE OwnerID = ? Order by GroupID DESC LIMIT 1;`;
      const [result] = await select(query, [createrUserID]);
      return result.GroupID;
    } catch (error) {
      return error;
    }
  }

  //Return a list users who are members of the group (groupID)
  async getGroupMembers(groupID) {
    try {
      const query = `SELECT Users.UserID, Users.Username, Users.DisplayName, Users.ProfileIconLink FROM abbankDB.GroupMembers
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
      const query = `UPDATE Collective SET OwnerID = ? WHERE (GroupID = ?);`;
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
      const query = `DELETE FROM Collective WHERE (GroupID = ?);`;
      await update(query, [groupID]);
      return "Delete group operation successful";
    } catch (error) {
      return error;
    }
  }
}

module.exports = GroupManager;
