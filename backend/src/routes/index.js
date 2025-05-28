// ===== 📁 backend/routes/index.js =====
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const sensorDataRoutes = require('./sensorDataRoutes');
const alertRoutes = require('./alertRoutes');
const testRoutes = require('./testRoutes');
const firebaseDataRoutes = require('./firebaseDataRoutes');
const settingRoutes = require('./settingRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/sensors', sensorDataRoutes);
router.use('/alerts', alertRoutes);
router.use('/test', testRoutes);
router.use('/firebasedata', firebaseDataRoutes);
router.use('/settings', settingRoutes);

module.exports = router;
