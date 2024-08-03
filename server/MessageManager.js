//Imports
const { select, update } = require("./DB");

class GroupMessage {
  async getMessageList(userID) {
    try {
      const query = `(WITH getLatestDirect AS (
  SELECT m.*, ROW_NUMBER() OVER (PARTITION BY Case
    WHEN senderID = ? THEN receiverID
    WHEN receiverID = ? THEN senderID
    END ORDER BY time DESC) AS latest
  FROM directmessage AS m
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
SELECT   0 as isGroup, users.userID as id, users.displayName as name, users.profileIcon as icon, getLatestDirect.senderID, (Select displayName FROM users Where users.userID = getLatestDirect.senderID) as senderName, getLatestDirect.message,getLatestDirect.time FROM getLatestDirect
INNER JOIN users ON (userID = CASE
	WHEN senderID = ? THEN receiverID
    WHEN receiverID = ? THEN senderID
    END)
WHERE latest = 1
GROUP BY Case
        WHEN senderID = ? THEN receiverID
    WHEN receiverID = ? THEN senderID
    END)
UNION 
(WITH getLatestGroupMessage AS (
  SELECT m.*, ROW_NUMBER() OVER (PARTITION BY groupID ORDER BY time DESC) AS latest
  FROM groupmessages AS m
  WHERE groupID IN (SELECT groupID FROM groupmembers WHERE memberID = ?)
)
SELECT  1 as isGroup, community.groupID as id, community.groupName as name, community.groupProfileIcon as icon, users.userID as senderID, users.displayName as senderName, getLatestGroupMessage.groupMessage as message,getLatestGroupMessage.time FROM getLatestGroupMessage
INNER JOIN community ON (getLatestGroupMessage.groupID = community.groupID)
INNER JOIN users ON (getLatestGroupMessage.userID = users.userID) where latest = 1)
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
    groupmessages.groupID IS NULL AND community.groupID IN (SELECT groupID FROM groupmembers WHERE memberID = ?)) ORDER BY time DESC;
`;
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
      ]);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getDirectMessage(senderID, receiverID, page) {
    page *= 8;
    try {
      const query = `SELECT 
    *
FROM
    (SELECT 
        directmessage.*
    FROM
        directmessage
	
	LEFT JOIN
      cleardirectmessage ON cleardirectmessage.senderID = ? AND cleardirectmessage.recieverID = ?
    WHERE
        directmessage.senderID IN (? , ?)
            AND directmessage.receiverID IN (? , ?) and (cleardirectmessage.time IS NULL OR cleardirectmessage.Time < directmessage.time)
    ORDER BY directmessage.time DESC
    LIMIT 0 , ?) latestMessages
ORDER BY latestMessages.time ASC;
`;
      const result = await select(query, [
        senderID,
        senderID,
        senderID,
        receiverID,
        receiverID,
        senderID,
        page,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = GroupMessage;
