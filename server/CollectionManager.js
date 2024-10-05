const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");
const StoryManager = require("./StoryManager");

//What is a CollectionManager
//It is a class that manages the creation collections and adds post to specific collections
class CollectionManager {
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

  //Add a post to a collection
  async addStory(collectionID, storyID) {
    try {
      const query = `INSERT INTO collectionStory(collectionID,storyID) VALUE(?,?);`;
      await update(query, [collectionID, storyID]);
      return "Add post to collection operation successful";
    } catch (error) {
      return error;
    }
  }

  //Delete a collection
  async removeStory(collectionID, storyID) {
    try {
      const query = `DELETE FROM collectionStory WHERE collectionID = ? AND storyID = ?;`;
      await update(query, [collectionID, storyID]);
      return "Remove post from collection operation successful";
    } catch (error) {
      return error;
    }
  }

  async getStoryIDs(collectionID) {
    try {
      const query = `SELECT storyID FROM collection INNER JOIN collectionstory ON collection.collectionID = collectionstory.collectionID Where collection.collectionID = ? ORDER BY storyID`;
      const result = await select(query, [collectionID]);
      return result ? result.map((element) => element["storyID"]) : [];
    } catch (error) {
      return error;
    }
  }

  async getPublicCollections(userID) {
    try {
      const query = `SELECT collectionID,collectionTitle,coverPhoto FROM collection where userID = ? AND isPublic = 1;`;
      const result = await select(query, [userID]);
      return result ? result : [];
    } catch (error) {
      return error;
    }
  }

  async isStoryInCollection(collectionID, storyID) {
    try {
      const query = `Select count(*) from collectionstory where collectionID = ? and storyID = ?`;
      const [result] = await select(query, [collectionID, storyID]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async getUserCollections(userID) {
    try {
      const query = `SELECT collectionID,collectionTitle,coverPhoto FROM collection where userID = ?`;
      const result = await select(query, [userID]);
      return result ? result : [];
    } catch (error) {
      return error;
    }
  }
}

module.exports = CollectionManager;
