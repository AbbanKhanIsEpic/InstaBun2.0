const { select, update } = require("./DB.js");

class CommentManager {
  //Save the comment to the database
  async comment(postID, userID, comment) {
    try {
      const query = `INSERT INTO instabun.commentpost (postID, commenterID, comment) VALUES (?, ?, ?);`;
      await update(query, [postID, userID, comment]);
      return "Comment operation successful";
    } catch (error) {
      return error;
    }
  }

  //Get the comments from the post
  async getComments(postID, userID) {
    try {
      const query = `
      SELECT 
      commentpost.commentID,
      commentpost.comment,
      commentpost.commentDate,
      users.userID,
      users.username,
      users.displayName,
      users.profileIcon,
      (SELECT 
              COUNT(*)
          FROM
              commentLike
          WHERE
              commentLike.commentID = commentpost.commentID) AS totalLike,
      (SELECT 
              COUNT(*)
          FROM
              commentDislike
          WHERE
              commentDislike.commentID = commentpost.commentID) AS totalDislike,
      (SELECT 
              COUNT(*)
          FROM
              CommentLike
          WHERE
              CommentLike.commentID = commentpost.commentID
                  AND CommentLike.userID = ?) AS didLike,
      (SELECT 
              COUNT(*)
          FROM
              CommentDislike
          WHERE
              CommentDislike.commentID = commentpost.commentID
                  AND CommentDislike.userID = ?) AS didDislike
  FROM
      instabun.commentpost
          INNER JOIN
      Users ON users.userID = commentpost.commenterID
  WHERE
      PostID = ?
  ORDER BY ((totalLike + 1) / (totalDislike + 1)) DESC;`;
      const result = await select(query, [userID, userID, postID]);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  }

  //Make the user first un-dislike the comment
  //Then the user like the comment
  async like(commentID, userID) {
    try {
      await this.unDisLike(commentID, userID);
      const query = `Insert into CommentLike(commentID,userID) Values(?,?)`;
      await update(query, [commentID, userID]);
      return "Like comment operation successful";
    } catch (error) {
      return error;
    }
  }

  //Make the user first un-like the comment
  //Then the user dislike the comment
  async dislike(commentID, userID) {
    try {
      await this.unLike(commentID, userID);
      const query = `Insert into CommentDislike(commentID,userID) Values(?,?)`;
      await update(query, [commentID, userID]);
      return "Like comment operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save that the user unliked the comment
  async unLike(commentID, userID) {
    try {
      const query = `DELETE FROM CommentLike WHERE commentID = ? AND userID = ?`;
      await update(query, [commentID, userID]);
      return "Remove like operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save that the user un-disliked the comment
  async unDisLike(commentID, userID) {
    try {
      const query = `DELETE FROM CommentDislike WHERE commentID = ? AND userID = ?`;
      await update(query, [commentID, userID]);
      return "Remove dislike operation successful";
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentManager;
