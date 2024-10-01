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
  //In order to do this, we have to delete all record related to commentID in commentlike and commentdislike
  async removeComment(commentID) {
    try {
      await this.#removeAllLike(commentID);
      await this.#removeAllDislike(commentID);
      const query = `DELETE FROM commentpost WHERE commentID = ?;`;
      await update(query, [commentID]);
      return "Remove post from collection operation successful";
    } catch (error) {
      return error;
    }
  }

  //Remove all comment like
  async #removeAllLike(commentID) {
    try {
      const query = `DELETE FROM commentLike WHERE commentID = ?;`;
      await update(query, [commentID]);
      return "Remove post from collection operation successful";
    } catch (error) {
      return error;
    }
  }

  async #removeAllDislike(commentID) {
    try {
      const query = `DELETE FROM commentDislike WHERE commentID = ?;`;
      await update(query, [commentID]);
      return "Remove post from collection operation successful";
    } catch (error) {
      return error;
    }
  }

  //Get the comments from the post
  async getComments(postID, userID) {
    //Get comments
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
      const comments = await select(query, [postID]);
      //Going through JSON object array
      await Promise.all(
        comments.map(async (comment) => {
          const commentID = comment["commentID"];

          const [totalLike, totalDislike, hasLiked, hasDisliked] =
            await Promise.all([
              this.totalLike(commentID),
              this.totalDislike(commentID),
              this.hasLiked(commentID, userID),
              this.hasDisliked(commentID, userID),
            ]);

          comment["totalLike"] = totalLike;
          comment["totalDislike"] = totalDislike;
          comment["hasLiked"] = hasLiked;
          comment["hasDisliked"] = hasDisliked;
        })
      );

      comments.sort((a, b) => {
        const aRatio = this.#getRatio(a["totalLike"], a["totalDislike"]);
        const bRatio = this.#getRatio(b["totalLike"], b["totalDislike"]);

        return bRatio - aRatio;
      });

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

  #getRatio(likes, dislikes) {
    if (likes === 0 && dislikes === 0) {
      return 0; // No likes or dislikes, neutral
    } else if (dislikes === 0) {
      return Infinity; // No dislikes, treat as highest possible ratio
    } else if (likes === 0 && dislikes !== 0) {
      return -dislikes; // No likes, treat as lowest possible ratio
    } else {
      return likes / dislikes; // Regular ratio calculation
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
      const query = `SELECT COUNT(*) FROM commentdislike WHERE commentID = ?`;
      const [result] = await select(query, [commentID]);
      return result["COUNT(*)"];
    } catch (error) {
      return error;
    }
  }

  //Returns true or false if the user liked the comment or not
  async hasLiked(commentID, userID) {
    try {
      const query = `SELECT COUNT(*) FROM commentLike WHERE commentID = ? AND userID = ?`;
      const [result] = await select(query, [commentID, userID]);
      return result["COUNT(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  //Returns true or false if the user disliked the comment or not
  async hasDisliked(commentID, userID) {
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

  async getTotalComment(postID) {
    try {
      const query = `SELECT COUNT(*) FROM commentpost WHERE postID = ?`;
      const [result] = await select(query, [postID]);
      return result["COUNT(*)"];
    } catch (error) {
      return error;
    }
  }
}

module.exports = CommentManager;
