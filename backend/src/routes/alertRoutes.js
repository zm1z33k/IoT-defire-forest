const express = require('express');
const router = express.Router();
const { getAlerts, confirmAlert, createAlert } = require('../controllers/alertController');

// nemusíš používat `auth` pro testování
router.get('/', getAlerts);
router.post('/', createAlert);
router.put('/:id/confirm', confirmAlert); // <- potvrzení alertu

module.exports = router;