const { app, storage } = require("./Firebase.js");

class FirebaseStorageManager {
  async uploadFile(bytes, url) {
    try {
      const storageRef = ref(this.storage, url);
      const snapshot = await uploadBytes(storageRef, bytes);
      console.log("Uploaded an array!");
      console.log(snapshot);
      return "File upload successful";
    } catch (error) {
      return error;
    }
  }
}

module.exports = FirebaseStorageManager;
