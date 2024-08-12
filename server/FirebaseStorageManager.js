const admin = require("./Firebase");

const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const bucket = admin.storage().bucket();

class FirebaseStorageManager {
  async uploadFile(buffer, url, mimetype) {
    try {
      const fileRef = bucket.file(url);

      await fileRef.save(buffer, {
        metadata: {
          contentType: mimetype,
        },
      });

      await fileRef.makePublic();

      const [downloadableURL] = await fileRef.getSignedUrl({
        action: "read",
        expires: "03-09-2524", //this expire date is required (even though in the doc it says it is not)
      });

      const shortenDownloadableURL = downloadableURL.substring(
        0,
        downloadableURL.indexOf("?")
      ); // Return the download URL and not too many space

      return shortenDownloadableURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return error;
    }
  }
}

module.exports = FirebaseStorageManager;
