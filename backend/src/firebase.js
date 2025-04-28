const admin = require("firebase-admin");
const serviceAccount = require("./iot-project-36b08-firebase-adminsdk-fbsvc-0b07608f6a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // nebo: admin.database() pro Realtime DB

module.exports = db;