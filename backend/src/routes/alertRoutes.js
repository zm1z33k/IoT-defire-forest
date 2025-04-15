const express = require('express');
const router = express.Router();
const { getAlerts, confirmAlert, createAlert } = require('../controllers/alertController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAlerts);
router.put('/:id/confirm', auth, confirmAlert);
router.post('/', auth, createAlert);

module.exports = router;