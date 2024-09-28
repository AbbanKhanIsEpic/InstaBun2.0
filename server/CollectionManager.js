const { select, update } = require("./DB.js");
const sha1 = require("sha1");
const FirebaseStorageManager = require("./FirebaseStorageManager");
const StoryManager = require("./StoryManager");

//What is a CollectionManager
//It is a class that manages the creation collections and adds post to specific collections
class CollectionManager {
  //Returns a list of collections
  async getCollections(requestingUserID, targetUserID) {
    try {
      //Manager
      const storyManager = new StoryManager();

      if (requestingUserID == targetUserID) {
        const query = `SELECT collectionID,collectionTitle,coverPhoto FROM collection where userID = ?;`;
        const result = await select(query, [targetUserID]);

        if (!result.length) {
          return new Error("The user does not have any collection");
        }

        const promises = result.map(async (collection) => {
          const storyIDs = (
            await this.getStoryIDs(collection["collectionID"])
          ).map((element) => {
            return element["storyID"];
          });

          console.log(storyIDs);

          const storiesWithDetails = await storyManager.addDetails(storyIDs);

          console.log(storiesWithDetails[0]);

          collection["stories"] = storiesWithDetails[0]["stories"];
        });

        await Promise.all(promises);

        return result;
      } else {
        const query = `SELECT collectionID,collectionTitle,coverPhoto FROM collection where userID = ? AND isPublic = 1;`;
        const result = await select(query, [targetUserID]);

        if (!result.length) {
          return new Error("The user does not have any collection");
        }

        const collectionsWithDetails = await Promise.all(
          result.map(async (collection) => {
            const storyIDs = await this.getStoryIDs(
              collection?.["collectionID"]
            );
            const filteredStoryIDs = await storyManager.filter(
              requestingUserID,
              storyIDs
            );
            const storiesWithDetails = await storyManager.addDetails(
              filteredStoryIDs
            );
            return {
              ...collection,
              userID: storiesWithDetails["userID"],
              username: storiesWithDetails["username"],
              profileIcon: storiesWithDetails["profileIcon"],
              stories: storiesWithDetails["stories"],
              hasCloseFriend: storiesWithDetails["hasCloseFriend"],
            };
          })
        );

        return collectionsWithDetails;
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
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = CollectionManager;
