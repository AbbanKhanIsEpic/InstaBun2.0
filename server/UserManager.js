const { select, update } = require("./DB");
const FollowManager = require("./FollowManager");

//Imports

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
      const query = `UPDATE instabun.Users SET DisplayName = ?, Bio = ?, ProfileIconLink = ?, Visibility = ?, DMLimit = ?  WHERE (UserID = ?)`;
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

  async createAccount(username, emailAddress, password) {
    try {
      const query = `INSERT INTO Users (Username,Email,DisplayName, Password) VALUES (?,?,?,?);`;
      await update(query, [username, emailAddress, username, password]);
    } catch (error) {
      return error;
    }
  }

  //Block control
  async isUserBlocked(blockerUserID, blockedUserID) {
    try {
      const query = `SELECT count(*) FROM instabun.BlockUser where BlockerUserID = ? AND BlockedUserID = ?;`;
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

  //Get section
  async getUserID(userIdentifier) {
    if (userIdentifier.includes("@")) {
      try {
        const query = `SELECT userID FROM instabun.Users where Email = ?`;
        const [result] = await select(query, [userIdentifier]);
        return result;
      } catch (error) {
        return error;
      }
    } else {
      try {
        const query = `SELECT userID FROM instabun.Users where Username = ?`;
        const [result] = await select(query, [userIdentifier]);
        return result;
      } catch (error) {
        return error;
      }
    }
  }

  async getUsername(userID) {
    try {
      const query = `SELECT Username FROM instabun.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      return result["Username"];
    } catch (error) {
      return error;
    }
  }

  async getEmail(username) {
    try {
      const query = `SELECT Email FROM instabun.Users where Username = ?`;
      const [result] = await select(query, [username]);
      return result["Email"];
    } catch (error) {
      return error;
    }
  }

  //Checking if the email address is the user's email
  //This is used to allow user to login if they forgot their password

  async getDisplayName(userID) {
    try {
      const query = `SELECT DisplayName FROM instabun.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      return result["DisplayName"];
    } catch (error) {
      return error;
    }
  }

  async getUserProfile(userID) {
    try {
      const query = `SELECT Username,DisplayName,ProfileIconLink,Bio FROM instabun.Users where UserID = ?;`;
      const [result] = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUserProfileIconLink(userID) {
    try {
      const query = `SELECT ProfileIconLink FROM instabun.Users where UserID = ?`;
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

  //Users can search for other users by username or display name
  async getListOfUsers(searchQuery, userPerPage, page) {
    //The apart of the username could be in the front, end or middle
    //This is to give a better result
    searchQuery = "%" + searchQuery + "%";
    try {
      const query = `SELECT Username,DisplayName,profileIcon FROM instabun.Users where (Username Like ? OR DisplayName like ?)limit ?,?;`;
      const result = await select(query, [
        searchQuery,
        searchQuery,
        page * userPerPage,
        int(userPerPage),
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }

  async isUsernameTaken(username) {
    try {
      const query = `SELECT count(*) FROM instabun.Users where Username = ?;`;
      const [result] = await select(query, [username]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async checkTwoStepVerificationEnabled(userIdentifier) {
    if (userIdentifier.includes("@")) {
      try {
        const query = `SELECT 2SVE FROM instabun.Users where Email = ?;`;
        const [result] = await select(query, [userIdentifier]);
        console.log(result["2SVE"] == 1);
        return result["2SVE"] == 1;
      } catch (error) {
        return error;
      }
    } else {
      try {
        const query = `SELECT 2SVE FROM instabun.Users where Username = ?;`;
        const [result] = await select(query, [userIdentifier]);
        return result["2SVE"] == 1;
      } catch (error) {
        return error;
      }
    }
  }

  async enableTwoStepVerification(userID) {
    try {
      const query = `UPDATE instabun.Users SET 2SVE = 1 WHERE (UserID = ?)`;
      await update(query, [userID]);
      return "Update profile operation successful";
    } catch (error) {
      return error;
    }
  }

  async disableTwoStepVerification(userID) {
    try {
      const query = `UPDATE instabun.Users SET 2SVE = 0 WHERE (UserID = ?)`;
      await update(query, [userID]);
      return "Update profile operation successful";
    } catch (error) {
      return error;
    }
  }

  async isEmailTaken(email) {
    try {
      const query = `SELECT count(*) FROM instabun.Users where Email = ?;`;
      const [result] = await select(query, [email]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async getDMLimit(userID) {
    try {
      const query = `SELECT DMLimit FROM instabun.Users where UserID = ?;`;
      const [result] = await select(query, [userID]);
      return result["DMLimit"];
    } catch (error) {
      return error;
    }
  }

  //Login section
  //Check if the user's login credential is correct
  async userLogin(userIdentifier, password) {
    if (userIdentifier.includes("@")) {
      try {
        const query = `SELECT count(*) FROM instabun.Users where Email = ? AND Password = ?`;
        const [result] = await select(query, [userIdentifier, password]);
        return result["count(*)"] == 1;
      } catch (error) {
        return error;
      }
    } else {
      try {
        const query = `SELECT count(*) FROM instabun.Users where Username = ? AND Password = ?`;
        const [result] = await select(query, [userIdentifier, password]);
        return result["count(*)"] == 1;
      } catch (error) {
        return error;
      }
    }
  }

  //Change user's password
  async changePassword(emailAddress, password) {
    try {
      const query = `UPDATE instabun.users SET Password = ? WHERE (Email = ?);`;
      await update(query, [password, emailAddress]);
      return "Update user's password operation successful";
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserManager;
