const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/sensorDataController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAll);

module.exports = router;