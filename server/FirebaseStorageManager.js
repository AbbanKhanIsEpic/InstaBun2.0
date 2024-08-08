const admin = require("./Firebase");

const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const bucket = admin.storage().bucket();

class FirebaseStorageManager {
  async uploadFile(base64, mime, url) {
    try {
      // Convert base-64 to Uint8Array
      const buffer = Buffer.from(base64, "base64");

      // Upload the Buffer to Firebase Storage
      const [file] = await bucket.upload(buffer, {
        destination: url, // Set the desired filename in your bucket
      });
      console.log(file);
      return "File upload successful";
    } catch (error) {
      console.error("Error uploading file:", error);
      return error;
    }
  }
}

module.exports = FirebaseStorageManager;
