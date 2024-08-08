//Imports
const { select, update } = require("./DB.js");

class GroupMessage {
  async getMessageList(userID) {
    try {
      const query = `(WITH getLatestDirect AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY Case
    WHEN senderID = ? THEN receiverID
    WHEN receiverID = ? THEN senderID
    END ORDER BY time DESC) AS latest
  FROM directmessage
  WHERE
    (senderID = ?
        AND receiverID NOT IN (SELECT
            blockedUserID
        FROM
            instabun.block
        WHERE
            blockerUserID = ?))
        OR (receiverID = ?
        AND senderID NOT IN (SELECT
            blockedUserID
        FROM
            instabun.block
        WHERE
            blockerUserID = ?))
)
SELECT  0 as isGroup, users.userID as id, users.displayName as name, 
users.profileIcon as icon, 
(CASE WHEN getLatestDirect.time > cleardirectmessage.time OR cleardirectmessage.time is NULL then getLatestDirect.senderID else NULL END) as senderID, 
(CASE WHEN getLatestDirect.time > cleardirectmessage.time OR cleardirectmessage.time is NULL then (Select displayName FROM users Where users.userID = getLatestDirect.senderID) else NULL END) as senderName, 
(CASE WHEN getLatestDirect.time > cleardirectmessage.time OR cleardirectmessage.time is NULL then getLatestDirect.message else NULL END)  as message,
(CASE WHEN getLatestDirect.time > cleardirectmessage.time OR cleardirectmessage.time is NULL then getLatestDirect.time else cleardirectmessage.time END) as time FROM getLatestDirect
INNER JOIN users ON (userID = CASE
	WHEN getLatestDirect.senderID = ? THEN getLatestDirect.receiverID
    WHEN getLatestDirect.receiverID = ? THEN getLatestDirect.senderID
    END)
LEFT JOIN cleardirectmessage ON (cleardirectmessage.senderID = ? AND cleardirectmessage.recieverID= CASE
	WHEN getLatestDirect.senderID = ? THEN getLatestDirect.receiverID
    WHEN getLatestDirect.receiverID = ? THEN getLatestDirect.senderID
    END)
WHERE latest = 1
GROUP BY Case
        WHEN getLatestDirect.senderID = ? THEN getLatestDirect.receiverID
    WHEN getLatestDirect.receiverID = ? THEN getLatestDirect.senderID
    END)
UNION 
(WITH getLatestGroupMessage AS (
  SELECT m.*, ROW_NUMBER() OVER (PARTITION BY groupID ORDER BY time DESC) AS latest
  FROM groupmessages AS m
  WHERE groupID IN (SELECT groupID FROM groupmembers WHERE memberID = ?)
)
SELECT  1 as isGroup, community.groupID as id, community.groupName as name, community.groupProfileIcon as icon, (CASE WHEN getLatestGroupMessage.time > cleargroupmessage.time OR cleargroupmessage.time is NULL then users.userID else NULL END) as senderID, (CASE WHEN getLatestGroupMessage.time > cleargroupmessage.time OR cleargroupmessage.time is NULL then users.displayName else NULL END) as senderName, (CASE WHEN getLatestGroupMessage.time > cleargroupmessage.time OR cleargroupmessage.time is NULL then getLatestGroupMessage.groupMessage else NULL END) as message,(CASE WHEN getLatestGroupMessage.time > cleargroupmessage.time OR cleargroupmessage.time is NULL then getLatestGroupMessage.time else cleargroupmessage.time END) as time FROM getLatestGroupMessage
INNER JOIN community ON (getLatestGroupMessage.groupID = community.groupID)
INNER JOIN users ON (getLatestGroupMessage.userID = users.userID) 
LEFT JOIN cleargroupmessage ON (cleargroupmessage.userID = ?  AND cleargroupmessage.groupID = community.groupID)
where latest = 1)
UNION
(SELECT 
    1 AS isGroup,
    community.groupID AS id,
    community.groupName AS name,
    community.groupProfileIcon AS icon,
    NULL AS senderID,
    NULL AS senderName,
    NULL AS message,
    community.groupCreationDate AS time
FROM
    groupmessages
        RIGHT JOIN
    community ON (groupmessages.groupID = community.groupID)
WHERE
    groupmessages.groupID IS NULL AND community.groupID IN (SELECT groupID FROM groupmembers WHERE memberID = ?)) ORDER BY time DESC;`;
      const result = await select(query, [
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
        userID,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getDirectMessage(senderID, receiverID) {
    try {
      const query = `SELECT 
        directmessage.*
    FROM
        directmessage
	
	LEFT JOIN
      cleardirectmessage ON cleardirectmessage.senderID = ? AND cleardirectmessage.recieverID = ?
    WHERE
        directmessage.senderID IN (? , ?)
            AND directmessage.receiverID IN (? , ?) and (cleardirectmessage.time IS NULL OR cleardirectmessage.Time < directmessage.time)
            ORDER BY directmessage.time;
`;
      const result = await select(query, [
        senderID,
        receiverID,
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

  async getGroupMessage(userID, groupID) {
    try {
      const query = `SELECT 
      groupmessages.messageID as messageID,
    users.displayName,
    users.userID as senderID,
    users.profileIcon as icon,
    groupmessages.groupMessage AS message,
    groupmessages.time
FROM
    groupmessages
        LEFT JOIN
    cleargroupmessage ON (cleargroupmessage.userID = ?
        AND cleargroupmessage.groupID = groupmessages.groupID)
        INNER JOIN
    users ON (users.userID = groupmessages.userID)
WHERE
    groupmessages.groupID = ?
        AND (cleargroupmessage.time IS NULL
        OR cleargroupmessage.time < groupmessages.time) ORDER BY groupmessages.time;;`;
      const result = await select(query, [userID, groupID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  deleteDirectMessage(messageID) {
    try {
      const query = `DELETE FROM directmessage WHERE (messageID = ?);`;
      update(query, [messageID]);
      return "Delete direct message operation successful";
    } catch (error) {
      return error;
    }
  }

  deleteGroupMessage(messageID) {
    try {
      const query = `DELETE FROM groupmessages WHERE (messageID = ?);`;
      update(query, [messageID]);
      return "Delete direct message operation successful";
    } catch (error) {
      return error;
    }
  }

  sendDirectMessage(senderID, receiverID, message) {
    try {
      const query = `INSERT INTO directmessage (senderID,receiverID,message) VALUES (?,?,?);`;
      update(query, [senderID, receiverID, message]);
      return "Sent direct message operation successful";
    } catch (error) {
      return error;
    }
  }

  sendGroupMessage(groupID, senderID, message) {
    try {
      const query = `INSERT INTO groupmessages (groupID,userID,groupMessage) VALUES (?,?,?);`;
      update(query, [groupID, senderID, message]);
      return "Sent group message operation successful";
    } catch (error) {
      return error;
    }
  }

  async getBlockedMessages(userID) {
    try {
      const query = `With blockedUsers as (
SELECT blockedUserID FROM block
where blockerUserID = ?

), lastestBlockedMessages as (
 Select *, ROW_NUMBER() OVER (PARTITION BY Case
    WHEN senderID = ? THEN receiverID
    WHEN receiverID = ? THEN senderID
    END ORDER BY time DESC) as latest FROM directmessage JOIN blockedUsers 
where (receiverID IN (blockedUsers.blockedUserID) AND senderID =?) OR (senderID IN (blockedUsers.blockedUserID) AND receiverID = ?)
) SELECT * FROM lastestBlockedMessages where latest = 1 `;
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
}

module.exports = GroupMessage;
