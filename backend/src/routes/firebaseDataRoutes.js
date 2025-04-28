const express = require('express');
const router = express.Router();
const db = require('../firebase');

// Получить все алерты
router.get('/alerts', async (req, res) => {
  try {
    const snapshot = await db.collection('alerts').orderBy('dateTime', 'desc').get();
    const alerts = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching alerts', error: err });
  }
});

// Получить все сенсоры
router.get('/monitoring', async (req, res) => {
  try {
    const snapshot = await db.collection('sensors').orderBy('dateTime', 'desc').get();
    const sensors = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching monitoring data', error: err });
  }
});

// Получить данные по конкретному сенсору
router.get('/monitoring/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await db.collection('sensors')
      .where('sensorId', '==', id)
      .orderBy('dateTime', 'desc')
      .limit(30)
      .get();
    const data = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sensor details', error: err });
  }
});

// Confirm alert
router.patch('/alerts/:id/confirm', async (req, res) => {
  const { id } = req.params;
  try {
    const alertRef = db.collection('alerts').doc(id);
    await alertRef.update({
      confirmed: true,
      status: 'Confirmed'
    });
    res.json({ message: 'Alert confirmed' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to confirm alert', error: err });
  }
});

module.exports = router;