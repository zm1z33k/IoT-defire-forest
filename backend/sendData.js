const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");


initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();


const THRESHOLDS = {
  temperature: 50,     // °C
  co2Level: 100,       // ppm
  humidity: 20         // %
};


async function sendData() {
  const data = {
    sensorId: "A23",
    temperature: getTemperature(),
    co2Level: getCO2Level(),
    humidity: getHumidity(),
    gps: [50.880078, 14.249905], 
    dateTime: new Date().toISOString(),
    confirmed: false,
    status: "Active"
  };

  const shouldCreateAlert =
    data.temperature > THRESHOLDS.temperature ||
    data.co2Level > THRESHOLDS.co2Level ||
    data.humidity < THRESHOLDS.humidity;

  try {

    await db.collection("monitoring").add(data);
    console.log("📦 Sensor data saved");

    if (shouldCreateAlert) {
      const alertRef = await db.collection("alerts").add(data);
      console.log("🚨 Alert created with ID:", alertRef.id);
    } else {
      console.log("✅ All values normal");
    }
  } catch (err) {
    console.error("❌ Error while sending data:", err);
  }
}


function getTemperature() {
  return 55 + Math.random() * 5; 
}

function getCO2Level() {
    return 90 + Math.random() * 50;
}

function getHumidity() {
  return 10 + Math.random() * 15; // ← заменить на реальный input
}

// Запуск каждый 5 минут
setInterval(() => {
  sendData();
}, 5 * 60 * 1000);

// Первый запуск сразу
sendData();