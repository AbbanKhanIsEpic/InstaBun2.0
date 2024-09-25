const { select, update } = require("./DB.js");

class CommentManager {
  //Save the comment to the database
  async addComment(postID, userID, comment) {
    try {
      const query = `INSERT INTO commentpost (postID, commenterID, comment) VALUES (?, ?, ?);`;
      await update(query, [postID, userID, comment]);
      return "Comment operation successful";
    } catch (error) {
      return error;
    }
  }

  //Remove the comment from the database
  async removeComment(commentID) {
    try {
      const query = `DELETE FROM commentpost WHERE commentID = ?;`;
      await update(query, [commentID]);
      return "Remove post from collection operation successful";
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
        users.profileIcon
      FROM
        instabun.commentpost
      INNER JOIN
        Users ON users.userID = commentpost.commenterID
      WHERE
        PostID = ?
    `;
      const comments = await select(query, [userID, userID, postID]);
      //Going through JSON object array
      for (let i = 0; i < comments.length; i++) {
        //Getting the IDs
        const commenterID = comments[i]["userID"];
        const commentID = comments[i]["commentID"];

        //Adding total like
        comments[i]["totalLike"] = await this.totalLike(commentID);

        //Adding total dislike
        comments[i]["totalDislike"] = await this.totalDislike(commentID);

        //Adding hasLiked
        comments[i]["hasLiked"] = await this.hasLiked(commentID, commenterID);

        //Adding hasDisliked
        comments[i]["hasDisliked"] = await this.hasDisliked(
          commentID,
          commenterID
        );
      }
      return comments;
    } catch (error) {
      return error;
    }
  }

  //Make the user first un-dislike the comment
  //Then the user like the comment
  async like(commentID, userID) {
    try {
      await this.removeDislike(commentID, userID);
      const query = `Insert into CommentLike(commentID,userID) Values(?,?)`;
      await update(query, [commentID, userID]);
      return "Like comment operation successful";
    } catch (error) {
      return error;
    }
  }

  //Returns a number representing the total number of likes
  async totalLike(commentID) {
    try {
      const query = `SELECT COUNT(*) FROM commentLike WHERE commentID = ?`;
      const [result] = await select(query, [commentID]);
      return result["COUNT(*)"];
    } catch (error) {
      return error;
    }
  }

  //Returns a number representing the total number of dislikes
  async totalDislike(commentID) {
    try {
      const query = `SELECT COUNT(*) FROM commentdislike WHERE commentLike = ?`;
      const [result] = await select(query, [commentID]);
      return result["COUNT(*)"];
    } catch (error) {
      return error;
    }
  }

  //Returns true or false if the user liked the comment or not
  async didLike(commentID, userID) {
    try {
      const query = `SELECT COUNT(*) FROM commentLike WHERE commentID = ? AND userID = ?`;
      const [result] = await select(query, [commentID, userID]);
      return result["COUNT(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Returns true or false if the user disliked the comment or not
  async didDislike(commentID, userID) {
    try {
      const query = `SELECT COUNT(*) FROM commentdislike WHERE commentID = ? AND userID = ?`;
      const [result] = await select(query, [commentID, userID]);
      return result["COUNT(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Make the user first un-like the comment
  //Then the user dislike the comment
  async dislike(commentID, userID) {
    try {
      await this.removeLike(commentID, userID);
      const query = `Insert into CommentDislike(commentID,userID) Values(?,?)`;
      await update(query, [commentID, userID]);
      return "Like comment operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save that the user unliked the comment
  async removeLike(commentID, userID) {
    try {
      const query = `DELETE FROM CommentLike WHERE commentID = ? AND userID = ?`;
      await update(query, [commentID, userID]);
      return "Remove like operation successful";
    } catch (error) {
      return error;
    }
  }

  //Save that the user un-disliked the comment
  async removeDislike(commentID, userID) {
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
