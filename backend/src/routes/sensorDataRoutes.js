const express = require('express');
const router = express.Router();
const { createSensorData, getSensorData } = require('../controllers/sensorDataController');

router.post('/', createSensorData);
router.get('/', getSensorData); // 🔥 добавь это

module.exports = router;