const cron = require('node-cron');
const SensorData = require('../models/SensorData');
const Alert = require('../models/Alert');
const notificationService = require('../services/notificationService');
const User = require('../models/User');

// Проверяем данные каждые 10 минут
cron.schedule('*/10 * * * *', async () => {
  console.log('Cron started: Checking sensor data...');

  const latestData = await SensorData.find().sort({ createdAt: -1 }).limit(2);
  if (latestData.length < 2) return;

  const [current, previous] = latestData;

  const significantChange = Math.abs(current.temperature - previous.temperature) >= 5
    || Math.abs(current.co2Level - previous.co2Level) >= 100
    || Math.abs(current.humidity - previous.humidity) >= 10;

  if (significantChange) {
    const newAlert = await Alert.create({
      sensorId: current._id,
      gps: current.gps,
      co2Level: current.co2Level,
      temperature: current.temperature,
      humidity: current.humidity
    });

    const responsibleUsers = await User.find({ role: { $in: ['operator', 'fire', 'agency'] } });

    for (const user of responsibleUsers) {
      await notificationService.sendSMS(user.phone, `ALERT: Changes detected at ${current.gps}`);
    }

    console.log('Alert created and notifications sent');
  }
});