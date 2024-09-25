const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");

//What is a Bookmark Manager
//It is a class that manages the creation of bookmarks and adds post to specific bookmarks
class BookmarkManager {
  //Returns a list of bookmarks
  async getList(userID) {
    try {
      const query = `SELECT bookmarkID,bookmarkTitle FROM bookmark where userID = ?;`;
      const result = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }

  //Creates a bookmark
  async create(bookmarkTitle, userID, coverImage) {
    try {
      const buffer = coverImage.buffer;
      const fileName = sha1(buffer);
      const url = "bookmarkCover/" + fileName;
      const mimetype = coverImage.mimetype;

      const firebaseStorageManager = new FirebaseStorageManager();
      const coverLink = await firebaseStorageManager.uploadFile(
        buffer,
        url,
        mimetype
      );

      const query = `INSERT INTO bookmark(bookmarkTitle,coverPhoto, userID) VALUE(?,?,?);`;
      await update(query, [bookmarkTitle, coverLink, userID]);
      return "Bookmark creation operation successful";
    } catch (error) {
      return error;
    }
  }

  //Delete a bookmark
  async delete(bookmarkID) {
    try {
      const query = `DELETE FROM bookmark WHERE bookmarkID = ?;`;
      await update(query, [bookmarkID]);
      return "Bookmark deletion operation successful";
    } catch (error) {
      return error;
    }
  }

  //Add a post to a bookmark
  async addPost(bookmarkID, postID) {
    try {
      const query = `INSERT INTO bookmarkpost(bookmarkID,postID) VALUE(?,?);`;
      await update(query, [bookmarkID, postID]);
      return "Add post to bookmark operation successful";
    } catch (error) {
      return error;
    }
  }

  //Delete a bookmark
  async removePost(bookmarkID, postID) {
    try {
      const query = `DELETE FROM bookmarkpost WHERE bookmarkID = ? AND postID = ?;`;
      await update(query, [bookmarkID, postID]);
      return "Remove post from bookmark operation successful";
    } catch (error) {
      return error;
    }
  }

  //Returns if user has bookmarked the post
  async hasBookmarked(userID, postID) {
    try {
      const query = `SELECT COUNT(*) FROM bookmark INNER JOIN bookmarkpost ON bookmarkpost.bookmarkID = bookmark.bookmarkID where userID = ? AND postID = ?;`;
      const [result] = await select(query, [userID, postID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }
}

module.exports = BookmarkManager;
