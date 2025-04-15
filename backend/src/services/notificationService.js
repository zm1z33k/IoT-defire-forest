const twilio = require('twilio');
const config = require('../config');

const client = twilio(config.twilioSID, config.twilioToken);

exports.sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: config.twilioPhone,
      to: to
    });
    console.log('SMS sent to', to);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

// === Добавление вызова уведомления в alertController.js ===
const Alert = require('../models/Alert');
const notificationService = require('../services/notificationService');
const User = require('../models/User');

exports.getAlerts = async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json(alerts);
};

exports.confirmAlert = async (req, res) => {
  const { id } = req.params;
  await Alert.findByIdAndUpdate(id, { confirmed: true });
  res.json({ message: 'Alert confirmed' });
};

exports.createAlert = async (req, res) => {
  const { sensorId, gps, co2Level, temperature, humidity } = req.body;
  const newAlert = await Alert.create({ sensorId, gps, co2Level, temperature, humidity });

  // Поиск пользователей с ролью operator, fire, agency
  const responsibleUsers = await User.find({ role: { $in: ['operator', 'fire', 'agency'] } });

  // Отправка SMS каждому ответственному
  for (const user of responsibleUsers) {
    await notificationService.sendSMS(user.phone, `Fire Alert! Location: ${gps}, Temp: ${temperature}, CO2: ${co2Level}`);
  }

  res.json(newAlert);
};