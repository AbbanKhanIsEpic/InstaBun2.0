const serviceAccount = require("./serviceAccountKey.json");

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://instabun-556ce.appspot.com",
});

module.exports = admin;
