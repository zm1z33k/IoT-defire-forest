// 📁 controllers/sensorDataController.js
const db = require('../firebase');

// 🔧 Проверка и создание алертов
const checkAndCreateAlert = async (sensorData) => {
  try {
    const settingsSnap = await db.collection('config').doc('thresholds').get();
    if (!settingsSnap.exists) {
      console.warn('⚠️ Threshold settings not found in Firestore.');
      return;
    }

    const raw = settingsSnap.data();

    const thresholds = {
      maxTemperature: Number(raw?.tempMax),
      minTemperature: Number(raw?.tempMin),
      maxCO2: Number(raw?.co2Max),
      minCO2: Number(raw?.co2Min),
      maxHumidity: Number(raw?.humidityMax),
      minHumidity: Number(raw?.humidityMin),
    };

    const { temperature, co2Level, humidity, gps, sensorId } = sensorData;
    const alerts = [];

    if (thresholds.maxTemperature && temperature > thresholds.maxTemperature) {
      alerts.push({
        sensorId,
        type: 'High Temperature',
        value: temperature,
        gps,
        status: 'Active',
        dateTime: new Date().toISOString(),
      });
    }

    if (thresholds.maxCO2 && co2Level > thresholds.maxCO2) {
      alerts.push({
        sensorId,
        type: 'High CO2 Level',
        value: co2Level,
        gps,
        status: 'Active',
        dateTime: new Date().toISOString(),
      });
    }

    if (thresholds.maxHumidity && humidity > thresholds.maxHumidity) {
      alerts.push({
        sensorId,
        type: 'High Humidity',
        value: humidity,
        gps,
        status: 'Active',
        dateTime: new Date().toISOString(),
      });
    }

    for (const alert of alerts) {
      await db.collection('alerts').add(alert);
      console.log(`🚨 Alert created: ${alert.type} from ${sensorId}`);
    }
  } catch (err) {
    console.error('❌ Failed to check thresholds or create alert:', err);
  }
};

// 🌡️ Контроллер для создания сенсорных данных
const createSensorData = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('monitoring').add(data);
    console.log('📥 New sensor data:', data);

    await checkAndCreateAlert(data);

    res.status(201).json({ message: 'Sensor data stored and checked for alerts.' });
  } catch (error) {
    console.error('❌ Error creating sensor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createSensorData,
};
