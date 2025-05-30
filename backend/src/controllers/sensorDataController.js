
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
    console.log('📥 RAW data from RPi:', req.body);
    const data = req.body;

    const normalizedData = {
      sensorId: data.sensorId || 'sensor-01',
      temperature: data.temperature ?? (data.temp ?? (24 + Math.random() * 5)),
      humidity: data.humidity ? parseFloat(data.humidity) : (40 + Math.random() * 20),
      co2Level: data.co2Level ?? data.co2 ?? (800 + Math.random() * 1000),
      gps: Array.isArray(data.gps)
        ? data.gps
        : [
            parseFloat(data.latitude || data.lantitude || 50.0755),
            parseFloat(data.longitude || data.longtitude || 14.4378),
          ],
      dateTime: new Date().toISOString(),
      origin: 'sensor',
      satellitesTracked: data.satellites_tracked || null,
      altitude: data.altitude || null,
      fixQuality: data.fix_quality || null,
    };

    console.log('💾 Сохраняем:', normalizedData);

    const ref = await db.collection('monitoring').add(normalizedData);
    res.status(201).json({ message: 'Sensor data stored successfully', id: ref.id });
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

const getSensorDataById = async (req, res) => {
  const { id } = req.params;
  console.log("🧪 Fetching sensorId:", id); // Логируем ID для проверки

  try {
    const snapshot = await db.collection('monitoring')
      .where('sensorId', '==', id) // Фильтрация по sensorId
      .orderBy('dateTime', 'desc')
      .limit(30)
      .get();

    console.log("📦 Docs found:", snapshot.size); // Логируем количество найденных документов

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No data found for this sensorId', id });
    }

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Error fetching sensor by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createSensorData, getSensorData, getSensorDataById, checkAndCreateAlert };