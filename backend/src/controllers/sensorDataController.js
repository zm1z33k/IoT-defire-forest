// backend/controllers/sensorDataController.js
const db = require('../firebase');

// 🔧 Проверка и создание алертов и сохранение мониторинга
const checkAndCreateAlert = async (sensorData) => {
  try {
    const settingsSnap = await db.collection('config').doc('thresholds').get();
    if (!settingsSnap.exists) {
      console.warn('⚠️ No thresholds found');
      return;
    }

    const thresholds = {
      maxTemperature: +settingsSnap.get('tempMax'),
      minTemperature: +settingsSnap.get('tempMin'),
      maxCO2: +settingsSnap.get('co2Max'),
      minCO2: +settingsSnap.get('co2Min'),
      maxHumidity: +settingsSnap.get('humidityMax'),
      minHumidity: +settingsSnap.get('humidityMin'),
    };

    const { temperature, humidity, gps, sensorId } = sensorData;
    const co2Level = sensorData.co2Level ?? sensorData.co2level;
    const now = new Date().toISOString();
    const alerts = [];

    console.log('📊 Thresholds:', thresholds);
    console.log('📥 Sensor data:', sensorData);

    const conditions = [
      {
        check: temperature > thresholds.maxTemperature,
        type: 'High Temperature'
      },
      {
        check: co2Level > thresholds.maxCO2,
        type: 'High CO2 Level'
      },
      {
        check: humidity > thresholds.maxHumidity,
        type: 'High Humidity'
      }
    ];

    for (const condition of conditions) {
      if (condition.check) {
        console.log(`🚨 ${condition.type} detected`);
        const alert = {
          sensorId,
          type: condition.type,
          temperature,
          humidity,
          co2Level,
          gps,
          status: 'Active',
          dateTime: now
        };
        await db.collection('alerts').add(alert);
        await db.collection('monitoring').add({ ...alert, origin: 'alert' });
        console.log('✅ Alert created:', alert);
      }
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