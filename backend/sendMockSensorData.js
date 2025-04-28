// sendMockSensorData.js
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./src/iot-project-36b08-firebase-adminsdk-fbsvc-0b07608f6a.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const mockData = [
  {
    sensorId: "A23",
    temperature: 27.85,
    co2Level: 1069,
    humidity: 75.35,
    gps: [50.880078, 14.249905],
    status: "Active",
    dateTime: "2025-04-23T11:21:05.030Z",
  },
  {
    sensorId: "A23",
    temperature: 59.71,
    co2Level: 834,
    humidity: 35.54,
    gps: [50.880078, 14.249905],
    status: "Active",
    dateTime: "2025-04-23T11:31:05.030Z",
  },
  {
    sensorId: "A23",
    temperature: 79.16,
    co2Level: 487,
    humidity: 53.81,
    gps: [50.880078, 14.249905],
    status: "Active",
    dateTime: "2025-04-23T11:41:05.030Z",
  },
  {
    sensorId: "A23",
    temperature: 57.09,
    co2Level: 1188,
    humidity: 40.73,
    gps: [50.880078, 14.249905],
    status: "Active",
    dateTime: "2025-04-23T11:51:05.030Z",
  },
  {
    sensorId: "A23",
    temperature: 48.79,
    co2Level: 741,
    humidity: 88.58,
    gps: [50.880078, 14.249905],
    status: "Active",
    dateTime: "2025-04-23T12:01:05.030Z",
  },
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
