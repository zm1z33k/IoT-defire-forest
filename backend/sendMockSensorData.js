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
  "sensorId": "A21",
  "temperature": 67.5,
  "co2Level": 1200,
  "humidity": 65,
  "gps": [50.880078, 14.249905],
  "status": "Active",
  "dateTime": "2025-05-26T17:00:00Z"
}
];

async function uploadMockData() {
  for (const item of mockData) {
    try {
      const docRef = await db.collection("sensors").add(item);
      console.log("✅ Uploaded:", docRef.id);
    } catch (err) {
      console.error("❌ Error uploading:", err);
    }
  }
}

uploadMockData();
