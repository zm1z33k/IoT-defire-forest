const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/sensorDataController');

router.get('/', getAll); // bez auth pro jednodušší test

module.exports = router;