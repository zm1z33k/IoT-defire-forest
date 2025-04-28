const express = require('express');
const router = express.Router();
const { getThresholds, updateThresholds } = require('../controllers/settingsController');

router.get('/', getThresholds);
router.post('/', updateThresholds);

module.exports = router;