import { initFirebase } from "./Firebase.mjs";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const app = initFirebase();
const storage = getStorage(app);

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

export { FirebaseStorageManager };
