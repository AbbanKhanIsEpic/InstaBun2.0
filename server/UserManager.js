//Imports
const { select, update } = require("./DB");

const FollowManager = require("./FollowManager");

class UserManager {
  //Update the user's profile
  async updateProfile(
    userID,
    newDisplayName,
    newBio,
    newProfileIconLink,
    newVisibility,
    newDMLimit
  ) {
    try {
      const query = `UPDATE abbankDB.Users SET DisplayName = ?, Bio = ?, ProfileIconLink = ?, Visibility = ?, DMLimit = ?  WHERE (UserID = ?)`;
      await update(query, [
        newDisplayName,
        newBio,
        newProfileIconLink,
        newVisibility,
        newDMLimit,
        userID,
      ]);
      return "Update profile operation successful";
    } catch (error) {
      return error;
    }
  }

  async isUserBlocked(blockerUserID, blockedUserID) {
    try {
      const query = `SELECT count(*) FROM abbankDB.BlockUser where BlockerUserID = ? AND BlockedUserID = ?;`;
      const [result] = await select(query, [blockerUserID, blockedUserID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async block(blockerUserID, blockedUserID) {
    try {
      const query = `INSERT INTO BlockUser(BlockerUserID,BlockedUserID) VALUE(?,?);`;
      await update(query, [blockerUserID, blockedUserID]);
      //When user block someone, they want no association with them
      //So therefore, they will not be following them
      const follow = new FollowManager();
      follow.unfollow(blockerUserID, blockedUserID);
      return "Block operation successful";
    } catch (error) {
      return error;
    }
  }

  async unblock(blockerUserID, blockedUserID) {
    try {
      const query = `DELETE FROM BlockUser WHERE BlockerUserID = ? AND BlockedUserID = ?;`;
      await update(query, [blockerUserID, blockedUserID]);
      return "Unblock operation successful";
    } catch (error) {
      return error;
    }
  }

  async getUserID(username) {
    try {
      const query = `SELECT UserID FROM abbankDB.Users where Username = ?`;
      const [result] = await select(query, [username]);
      return result["UserID"];
    } catch (error) {
      return error;
    }
  }

  async getUsername(userID) {
    try {
      const query = `SELECT Username FROM abbankDB.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      return result["Username"];
    } catch (error) {
      return error;
    }
  }

  //Checking if the email address is the user's email
  //This is used to allow user to login if they forgot their password
  async doUserEmailMatch(username, emailAddress) {
    try {
      const query = `SELECT count(*) FROM abbankDB.Users where Username = ? AND EmailAddress = ?`;
      const [result] = await select(query, [username, emailAddress]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async getDisplayName(userID) {
    try {
      const query = `SELECT DisplayName FROM abbankDB.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      return result["DisplayName"];
    } catch (error) {
      return error;
    }
  }

  async getUserProfile(userID) {
    try {
      const query = `SELECT Username,DisplayName,ProfileIconLink,Bio FROM abbankDB.Users where UserID = ?;`;
      const [result] = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUserProfileIconLink(userID) {
    try {
      const query = `SELECT ProfileIconLink FROM abbankDB.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      //This happens if the userID does not exists
      //When created an account, a user will a profile icon
      if (result.length === 0) {
        return new Error("Unable to get the link of the user's profile icon");
      }
      return result["ProfileIconLink"];
    } catch (error) {
      return error;
    }
  }

  async getListOfUsernames(userID, searchingUsername, page) {
    const userPerPage = 5;
    page *= userPerPage;
    //The apart of the username could be in the front, end or middle
    //This is to give a better result
    searchingUsername = "%" + searchingUsername + "%";
    try {
      const query = `SELECT Username,DisplayName,ProfileIconLink FROM abbankDB.Users where Username Like ? AND UserID !=  ? limit ${page},${userPerPage};`;
      const result = await select(query, [searchingUsername, userID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //Check if the user's login credential is correct
  async userLogin(username, password) {
    try {
      const query = `SELECT count(*) FROM abbankDB.Users where Username = ? AND Password = ?`;
      const [result] = await select(query, [username, password]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async createAccount(
    username,
    displayName,
    password,
    profileIconLink,
    emailAddress
  ) {
    try {
      const query = `INSERT INTO Users (Username,DisplayName, Password, DateCreated, ProfileIconLink, EmailAddress, Visibility, DMLimit) VALUES (?, ?, ?, now(), ?, ?, 0, 0);
      `;
      await update(query, [
        username,
        displayName,
        password,
        profileIconLink,
        emailAddress,
      ]);
    } catch (error) {
      return error;
    }
  }

  async isUsernameTaken(username) {
    try {
      const query = `SELECT count(*) FROM abbankDB.Users where Username = ?;`;
      const [result] = await select(query, [username]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async isEmailTaken(email) {
    try {
      const query = `SELECT count(*) FROM abbankDB.Users where EmailAddress = ?;`;
      const [result] = await select(query, [email]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async getVisibility(userID) {
    try {
      const query = `SELECT Visibility FROM abbankDB.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      return result["Visibility"];
    } catch (error) {
      return error;
    }
  }

  async getDMLimit(userID) {
    try {
      const query = `SELECT DMLimit FROM abbankDB.Users where UserID = ?;`;
      const [result] = await select(query, [userID]);
      return result["DMLimit"];
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserManager;
