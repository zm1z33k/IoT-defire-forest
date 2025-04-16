const Alert = require('../models/Alert');

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
  try {
    const newAlert = new Alert(req.body);
    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při vytváření alertu', error });
  }
};