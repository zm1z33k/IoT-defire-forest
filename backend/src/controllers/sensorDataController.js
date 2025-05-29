// backend/controllers/sensorDataController.js
const db = require('../firebase');

// 🔧 Проверка и создание алертов и сохранение мониторинга
const checkAndCreateAlert = async (sensorData) => {
  try {
    const settingsSnap = await db.collection('config').doc('thresholds').get();
    if (!settingsSnap.exists) {
      console.log('⚠️ No thresholds found');
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

    console.log('📊 Thresholds:', thresholds);
    console.log('📥 Incoming data:', sensorData);

    const { temperature, co2Level, humidity, gps, sensorId } = sensorData;
    const alerts = [];

    const now = new Date().toISOString();

    if (thresholds.maxTemperature && temperature > thresholds.maxTemperature) {
      console.log('🚨 Temp exceeds threshold');
      alerts.push({ sensorId, type: 'High Temperature', temperature, humidity, co2Level, gps, status: 'Active', dateTime: now });
    }

    if (thresholds.maxCO2 && co2Level > thresholds.maxCO2) {
      console.log('🚨 CO2 exceeds threshold');
      alerts.push({ sensorId, type: 'High CO2 Level', temperature, humidity, co2Level, gps, status: 'Active', dateTime: now });
    }

    if (thresholds.maxHumidity && humidity > thresholds.maxHumidity) {
      console.log('🚨 Humidity exceeds threshold');
      alerts.push({ sensorId, type: 'High Humidity', temperature, humidity, co2Level, gps, status: 'Active', dateTime: now });
    }

    for (const alert of alerts) {
      await db.collection('alerts').add(alert);
      console.log('✅ Alert created:', alert);
      await db.collection('monitoring').add({ ...alert, origin: 'alert' });
    }
  } catch (err) {
    console.error('❌ Failed alert check:', err);
  }
};
const createSensorData = async (req, res) => {
  try {
    const data = req.body;
    const dateTime = new Date().toISOString();
    const fullData = { ...data, dateTime, origin: 'sensor' };

    await db.collection('monitoring').add(fullData);
    await checkAndCreateAlert(fullData);

    res.status(201).json({ message: 'Sensor data and alerts stored' });
  } catch (error) {
    console.error('❌ Error storing sensor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSensorData = async (req, res) => {
  try {
    const snapshot = await db.collection('monitoring').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    console.error('Failed to get sensor data:', err);
    res.status(500).json({ error: 'Failed to get sensor data' });
  }
};

module.exports = { createSensorData, getSensorData };