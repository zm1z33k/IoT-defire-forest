const express = require('express');
const router = express.Router();
const { getAllAlerts, confirmAlert, archiveAlert, createAlert} = require('../controllers/alertController');

router.get('/', getAllAlerts);
router.post('/', createAlert); // создание нового оповещения
router.patch('/:id/confirm', confirmAlert);   // подтверждение
router.patch('/:id/archive', archiveAlert);   // архивирование ✅ <== ОБЯЗАТЕЛЬНО!


module.exports = router;