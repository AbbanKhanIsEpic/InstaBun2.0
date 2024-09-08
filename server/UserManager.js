const { select, update } = require("./DB.js");
const FollowManager = require("./FollowManager.js");

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
  async getListOfUsers(searchQuery, userID) {
    //The apart of the username could be in the front, end or middle
    //This is to give a better result
    console.log(searchQuery, userID);
    searchQuery = "%" + searchQuery + "%";
    try {
      const query = `SELECT 
    Username, DisplayName, ProfileIcon,
    userID,
    (SELECT 
            COUNT(*)
        FROM
            followers
        WHERE
            FollowerID = ? AND FollowingID = userID) AS isFollowing
FROM
    users
WHERE
    (username LIKE ?
        OR displayNAme LIKE ?) AND userID != ?;`;
      const result = await select(query, [
        userID,
        searchQuery,
        searchQuery,
        userID,
      ]);
      console.log(query);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getRecommendardUsers(userID) {
    try {
      const users = await this.#getMutualAcquaintance(userID);
      if (users.length == 0) {
        return await this.#getPopularUsers(userID);
      }
      return users;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //This function is basically:
  //Get a list of users that the current user might friend
  //Basic breakdown:
  //First get the list of users who the current user is friends with
  //Second get a list of users who the friends are friends with
  //Thirdly, filter them by checking if the friends' friends are not friends with the current user
  async #getMutualAcquaintance(userID) {
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

MutualAcquaintance as (SELECT FollowerID as friendID, FollowingID as userID FROM followers WHERE  FollowerID IN (select * from friend) AND FollowingID NOT IN (select * from friend UNION select ? as userID) HAVING (SELECT 
        COUNT(*)
    FROM
        followers
    WHERE
        (FollowingID = friendID AND FollowerID = userID)
            OR (FollowingID = userID AND FollowerID = friendID)) = 2)
            
Select Username, DisplayName, ProfileIcon, MutualAcquaintance.userID, 0 as isFollowing from MutualAcquaintance INNER JOIN users on users.userID = MutualAcquaintance.userID group by MutualAcquaintance.userID;`;
      const result = await select(query, [userID, userID, userID, userID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  async #getPopularUsers(userID) {
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
