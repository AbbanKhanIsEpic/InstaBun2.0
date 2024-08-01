//Imports
const { select, update } = require("./DB");

class GroupMessage {
  async getMessageList(userID) {
    try {
      const query = `(WITH getLatestDirect AS (
  SELECT m.*, ROW_NUMBER() OVER (PARTITION BY Case
    WHEN senderID = ? THEN receiverID
    ELSE senderID
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
SELECT  users.DisplayName,users.profileIcon,getLatestDirect.message,getLatestDirect.time, "0" as isGroup, NULL as groupName FROM getLatestDirect
INNER JOIN users ON (userID = CASE
    WHEN senderID = ? THEN receiverID
    ELSE senderID
    END)
WHERE latest = 1
GROUP BY Case
    WHEN senderID = ? THEN receiverID
    ELSE senderID
    END)
UNION
(WITH getLatestGroupMessage AS (
  SELECT m.*, ROW_NUMBER() OVER (PARTITION BY groupID ORDER BY time DESC) AS latest
  FROM groupmessages AS m
  WHERE groupID IN (SELECT groupID FROM groupmembers WHERE memberID = ?)
)
SELECT users.DisplayName,community.groupProfileIcon as profileIcon,getLatestGroupMessage.groupMessage as message,getLatestGroupMessage.time,"1" as isGroup,community.groupName FROM getLatestGroupMessage
INNER JOIN community ON (getLatestGroupMessage.groupID = community.groupID)
INNER JOIN users ON (getLatestGroupMessage.userID = users.userID) where latest = 1)
UNION
(SELECT
    NULL as DisplayName,community.groupProfileIcon as profileIcon,NULL as message,community.groupCreationDate as time,"1" as isGroup,community.groupName
FROM
    groupmessages
        RIGHT JOIN
    community ON (groupmessages.groupID = community.groupID)
WHERE
    groupmessages.groupID IS NULL)
ORDER BY time desc;
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
      ]);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = GroupMessage;
