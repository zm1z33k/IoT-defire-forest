// sensorDataController.js
const db = require('../firebase');

exports.getAll = async (req, res) => {
  try {
    const snapshot = await db.collection('sensorData').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load sensor data', error: err });
  }
};