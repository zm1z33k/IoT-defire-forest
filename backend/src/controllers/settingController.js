const db = require('../firebase');

exports.getThresholds = async (req, res) => {
  try {
    const doc = await db.collection('config').doc('thresholds').get();
    res.json(doc.exists ? doc.data() : {});
  } catch (err) {
    res.status(500).json({ message: 'Failed to load thresholds', error: err });
  }
};

exports.updateThresholds = async (req, res) => {
  try {
    const newThresholds = req.body;
    await db.collection('config').doc('thresholds').set(newThresholds);
    res.json({ message: 'Thresholds updated', data: newThresholds });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update thresholds', error: err });
  }
};