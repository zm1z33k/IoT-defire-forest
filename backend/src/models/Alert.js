const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  sensorId: String,
  gps: String,
  co2Level: Number,
  temperature: Number,
  humidity: Number,
  createdAt: { type: Date, default: Date.now },
  confirmed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', alertSchema);
//mongoose.Schema.Types.ObjectId