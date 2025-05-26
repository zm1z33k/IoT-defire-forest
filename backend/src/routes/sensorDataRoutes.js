const express = require('express');
const router = express.Router();
const { createSensorData } = require('../controllers/sensorDataController');

router.post('/', createSensorData);

module.exports = router;