const admin = require("./Firebase");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucket = admin.storage().bucket();

class FirebaseStorageManager {
  async uploadFile(buffer, filePath, mimetype) {
    try {
      const fileRef = bucket.file(filePath);

      // Upload the file
      await fileRef.save(buffer, {
        metadata: {
          contentType: mimetype,
        },
      });

      // Make the file public
      await fileRef.makePublic();

      // Get the public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

      // Return the shortened public URL
      return publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Re-throw the error for further handling if needed
    }
  }
}

module.exports = FirebaseStorageManager;
