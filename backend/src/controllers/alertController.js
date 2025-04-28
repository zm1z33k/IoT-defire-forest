const db = require('../firebase');

// GET all alerts (sorted by date)
exports.getAlerts = async (req, res) => {
  try {
    const snapshot = await db.collection('alerts').orderBy('dateTime', 'desc').get();
    const alerts = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při načítání alertů', error });
  }
};

// CONFIRM alert by ID
exports.confirmAlert = async (req, res) => {
  const { id } = req.params;

  try {
    const alertRef = db.collection('alerts').doc(id);
    const doc = await alertRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    await alertRef.update({
      confirmed: true,
      status: 'Confirmed...'
    });

    res.json({ message: 'Alert confirmed' });
  } catch (err) {
    console.error('Error confirming alert:', err);
    res.status(500).json({ message: 'Failed to confirm alert', error: err });
  }
};

// CREATE new alert
exports.createAlert = async (req, res) => {
  try {
    const { sensorId, gps, co2Level, temperature, humidity } = req.body;

    const newAlert = {
      sensorId,
      gps,
      co2Level,
      temperature,
      humidity,
      confirmed: false,
      status: 'Active',
      dateTime: new Date().toISOString(),
    };

    const alertsRef = await db.collection('alerts').add(newAlert);

    res.status(201).json({ id: alertsRef.id, ...newAlert });
  } catch (error) {
    res.status(500).json({
      message: 'Chyba při vytváření alertu',
      error,
    });
  }
};