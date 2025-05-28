// ===== 📁 backend/controllers/alertController.js =====
const db = require('../firebase');

const getAllAlerts = async (req, res) => {
  try {
    const snapshot = await db.collection('alerts').orderBy('dateTime', 'desc').get();
    const alerts = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching alerts', error: err });
  }
};

const confirmAlert = async (req, res) => {
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
};

const archiveAlert = async (req, res) => {
  const { id } = req.params;
  try {
    const alertRef = db.collection('alerts').doc(id);
    await alertRef.update({
      archived: true,
      status: 'Archived'
    });
    res.json({ message: 'Alert archived' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to archive alert', error: err });
  }
};

module.exports = {
  getAllAlerts,
  confirmAlert,
  archiveAlert
};

