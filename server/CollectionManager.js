const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");

//What is a CollectionManager
//It is a class that manages the creation collections and adds post to specific collections
class CollectionManager {
  //Returns a list of collections
  async getCollections(requestingUserID, targetUserID) {
    try {
      if (requestingUserID == targetUserID) {
        const query = `SELECT collectionID,collectionTitle FROM collection where userID = ?;`;
        const result = await select(query, [requestingUserID, targetUserID]);
        return result;
      } else {
        const query = `SELECT collectionID,collectionTitle FROM collection where userID = ? AND isPublic = 1;`;
        const result = await select(query, [requestingUserID, targetUserID]);
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  //Creates a collection
  async create(collectionTitle, userID, coverImage, isPublic) {
    try {
      const buffer = coverImage.buffer;
      const fileName = sha1(buffer);
      const url = "collectionCover/" + fileName;
      const mimetype = coverImage.mimetype;

      const firebaseStorageManager = new FirebaseStorageManager();
      const coverLink = await firebaseStorageManager.uploadFile(
        buffer,
        url,
        mimetype
      );
      const query = `INSERT INTO collection(collectionTitle,coverPhoto,userID,isPublic) VALUE(?,?,?,?);`;
      await update(query, [collectionTitle, coverLink, userID, isPublic]);
      return "Collection creation operation successful";
    } catch (error) {
      return error;
    }
  }

  //Delete a collection
  async delete(collectionID) {
    try {
      const query = `DELETE FROM collection WHERE collectionID = ?;`;
      await update(query, [collectionID]);
      return "Collection deletion operation successful";
    } catch (error) {
      return error;
    }
  }

  //Add a post to a collection
  async addPost(collectionID, postID) {
    try {
      const query = `INSERT INTO collectionpost(collectionID,postID) VALUE(?,?);`;
      await update(query, [collectionID, postID]);
      return "Add post to collection operation successful";
    } catch (error) {
      return error;
    }
  }

  //Delete a collection
  async removePost(collectionID, postID) {
    try {
      const query = `DELETE FROM collectionpost WHERE collectionID = ? AND postID = ?;`;
      await update(query, [collectionID, postID]);
      return "Remove post from collection operation successful";
    } catch (error) {
      return error;
    }
  }
}

module.exports = CollectionManager;
