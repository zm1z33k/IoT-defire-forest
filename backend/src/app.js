const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
const alertRoutes = require('./routes/alertRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sensors', sensorDataRoutes);
app.use('/api/alerts', alertRoutes);

module.exports = app;