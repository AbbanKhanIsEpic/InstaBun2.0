const admin = require("./Firebase");

const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const bucket = admin.storage().bucket();

class FirebaseStorageManager {
  async uploadFile(buffer, baseURL, mimetype) {
    try {
      const fileRef = bucket.file(baseURL);

      await fileRef.save(buffer, {
        metadata: {
          contentType: mimetype,
        },
      });

      await fileRef.makePublic();
    } catch (error) {
      console.error("Error uploading file:", error);
      return error;
    }
  }
}

module.exports = FirebaseStorageManager;
