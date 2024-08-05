const { initFirebase } = require("./Firebase");
const { getStorage, ref, uploadBytes } = require("firebase/storage");
const app = initFirebase();
const storage = (getStorage) => getStorage(app);

class FirebaseStorageManager {
  async uploadFile(bytes, url) {
    try {
      const storageRef = ref(storage, url);
      uploadBytes(storageRef, bytes).then((snapshot) => {
        console.log("Uploaded an array!");
        console.log(snapshot);
        return "File upload successful";
      });
    } catch (error) {
      return error;
    }
  }
}

module.exports = FirebaseStorageManager;
