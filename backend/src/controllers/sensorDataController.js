const SensorData = require('../models/SensorData');

exports.getAll = async (req, res) => {
  const data = await SensorData.find().sort({ createdAt: -1 });
  res.json(data);
};