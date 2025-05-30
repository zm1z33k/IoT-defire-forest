// sendMockSensorData.js
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./src/serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const mockData = [
  {
    "sensorId": "A22",
    "temperature": 68.1,
    "co2Level": 1250,
    "humidity": 64,
    "gps": [50.880078, 14.249905],
    "status": "Active",
    "dateTime": "2025-05-25T17:00:00Z"
  },
  {
    "sensorId": "A22",
    "temperature": 66.9,
    "co2Level": 1190,
    "humidity": 66,
    "gps": [50.880078, 14.249905],
    "status": "Active",
    "dateTime": "2025-05-24T17:00:00Z"
  },
  {
    "sensorId": "A22",
    "temperature": 67.8,
    "co2Level": 1225,
    "humidity": 63,
    "gps": [50.880078, 14.249905],
    "status": "Active",
    "dateTime": "2025-05-23T17:00:00Z"
  },
  {
    "sensorId": "A22",
    "temperature": 67.2,
    "co2Level": 1210,
    "humidity": 65,
    "gps": [50.880078, 14.249905],
    "status": "Active",
    "dateTime": "2025-05-22T17:00:00Z"
  }

];

async function uploadMockData() {
  for (const item of mockData) {
    try {
      const docRef = await db.collection("monitoring").add(item);
      console.log("✅ Uploaded:", docRef.id);
    } catch (err) {
      console.error("❌ Error uploading:", err);
    }
  }
}

uploadMockData();
