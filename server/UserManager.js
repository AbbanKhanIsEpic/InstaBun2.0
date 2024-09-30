const { select, update } = require("./DB.js");
const FollowManager = require("./FollowManager.js");

//Imports
class UserManager {
  //Creates an account
  async createAccount(username, emailAddress, password) {
    try {
      const query = `INSERT INTO Users (Username,Email,DisplayName, Password) VALUES (?,?,?,?);`;
      await update(query, [username, emailAddress, username, password]);
    } catch (error) {
      return error;
    }
  }

  //Returns userID
  async getUserID(userIdentifier) {
    if (userIdentifier.includes("@")) {
      try {
        const query = `SELECT userID FROM instabun.Users where Email = ?`;
        const [result] = await select(query, [userIdentifier]);
        console.log(result);
        return result;
      } catch (error) {
        return error;
      }
    } else {
      try {
        const query = `SELECT userID FROM instabun.Users where Username = ?`;
        const [result] = await select(query, [userIdentifier]);
        console.log(result);
        return result;
      } catch (error) {
        return error;
      }
    }
  }

  //Returns username
  async getUsername(userID) {
    try {
      const query = `SELECT Username FROM instabun.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      return result["Username"];
    } catch (error) {
      return error;
    }
  }

  //Returns email
  async getEmail(username) {
    try {
      const query = `SELECT Email FROM instabun.Users where Username = ?`;
      const [result] = await select(query, [username]);
      return result["Email"];
    } catch (error) {
      return error;
    }
  }

  //Returns display name
  async getDisplayName(userID) {
    try {
      const query = `SELECT displayName FROM users where userID = ?`;
      const [result] = await select(query, [userID]);
      return result["displayName"];
    } catch (error) {
      return error;
    }
  }

  //Returns profile icon link
  async getProfileIcon(userID) {
    try {
      const query = `SELECT profileIcon FROM users where UserID = ?`;
      const [result] = await select(query, [userID]);
      return result ? result["profileIcon"] : null;
    } catch (error) {
      return error;
    }
  }

  //Return Profile
  async getProfile(userID) {
    const username = await this.getUsername(userID);
    const displayName = await this.getDisplayName(userID);
    const profileIcon = await this.getProfileIcon(userID);
    const bio = await this.getBio(userID);
    return {
      userID: userID,
      username: username,
      displayName: displayName,
      profileIcon: profileIcon,
      bio: bio,
    };
  }

  //Returns bio
  async getBio(userID) {
    try {
      const query = `SELECT bio FROM instabun.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      //This happens if the userID does not exists
      if (result.length === 0) {
        return new Error("Unable to get user's bio");
      }
      return result["bio"];
    } catch (error) {
      return error;
    }
  }

  async getDMLimit(userID) {
    try {
      const query = `SELECT DML FROM instabun.Users where UserID = ?`;
      const [result] = await select(query, [userID]);
      //This happens if the userID does not exists
      if (result.length === 0) {
        return new Error("Unable to get user's direct message limit");
      }
      return result["DML"];
    } catch (error) {
      return error;
    }
  }

  //Users can search for other users by username or display name
  async getListOfUsers(searchQuery, userID) {
    //Username or display name starting with the search query
    searchQuery += "%";
    try {
      //When searching for users, you are able to search yourself
      const query = `SELECT userID, username, displayName, profileIcon FROM users WHERE (username LIKE ? OR displayName LIKE ?);`;
      const listOfUsers = await select(query, [searchQuery, searchQuery]);
      //Iterating through the listOfUsers
      for (let i = 0; i < listOfUsers.length; i++) {
        const searchedUserID = listOfUsers[i]["userID"];

        const followManager = new FollowManager();

        listOfUsers[i]["isFollowing"] = await followManager.isFollowing(
          userID,
          searchedUserID
        );
      }
      return listOfUsers;
    } catch (error) {
      return error;
    }
  }

  //This function is basically:
  //Get a list of users that the current user might friend
  //Basic breakdown:
  //First get the list of users who the current user is friends with
  //Second get a list of users who the friends are friends with
  //Thirdly, filter them by checking if the friends' friends are not friends with the current user
  async getMutualAcquaintance(userID) {
    try {
      const query = `With friend as (SELECT 
    FollowingID AS userID
FROM
    followers
WHERE
    FollowerID = ?
HAVING (SELECT 
        COUNT(*)
    FROM
        followers
    WHERE
        (FollowingID = ? AND FollowerID = userID)
            OR (FollowingID = userID AND FollowerID = ?)) = 2), 

MutualAcquaintance as (SELECT FollowerID as friendID, FollowingID as userID FROM followers WHERE  FollowerID IN (select * from friend) AND FollowingID NOT IN (select * from friend UNION select ? as userID) AND FollowingID NOT IN (Select followingID from followers where FollowerID = ?))
            
Select username, displayName, profileIcon, MutualAcquaintance.userID, 0 as isFollowing from MutualAcquaintance INNER JOIN users on users.userID = MutualAcquaintance.userID group by MutualAcquaintance.userID;`;
      const result = await select(query, [
        userID,
        userID,
        userID,
        userID,
        userID,
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getPopularUsers(userID) {
    try {
      const query = `SELECT 
    username,
    displayName,
    profileIcon,
    userID,
    (SELECT 
            COUNT(*)
        FROM
            followers
        WHERE
            FollowerID = ? AND FollowingID = userID) isFollowing
FROM
    followers
        INNER JOIN
    users ON users.userID = followers.followingID
WHERE
    userID != ?
GROUP BY FollowingID
ORDER BY (COUNT(*)) DESC;`;
      const result = await select(query, [userID, userID]);
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
        return result["2SVE"] == 1;
      } catch (error) {
        return error;
      }
    } else {
      try {
        const query = `SELECT 2SVE FROM instabun.Users where Username = ?;`;
        const [result] = await select(query, [userIdentifier]);
        console.log(result);
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

  //Login section
  //Check if the user's login credential is correct
  async userLogin(userIdentifier, password) {
    if (userIdentifier.includes("@")) {
      try {
        const query = `SELECT count(*) FROM instabun.users where email = ? AND password = ?`;
        const [result] = await select(query, [userIdentifier, password]);
        return result["count(*)"] == 1;
      } catch (error) {
        return error;
      }
    } else {
      try {
        const query = `SELECT count(*) FROM instabun.Users where username = ? AND password = ?`;
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
