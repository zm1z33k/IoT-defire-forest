const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./src/iot-project-36b08-firebase-adminsdk-fbsvc-0b07608f6a.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const fakeData = [
  {
    sensorId: "A23",
    temperature: 85,
    co2Level: 500,
    humidity: 30,
    gps: [50.88, 14.25],
    dateTime: new Date().toISOString(),
    status: "Active",
    confirmed: false,
  },
  {
    sensorId: "A26",
    temperature: 90,
    co2Level: 600,
    humidity: 20,
    gps: [50.881, 14.251],
    dateTime: new Date().toISOString(),
    status: "Warning",
    confirmed: false,
  }
];

async function seedData() {
  for (const alert of fakeData) {
    const docRef = await db.collection("alerts").add(alert);
    console.log("✅ Added alert with ID:", docRef.id);
  }
}

seedData();