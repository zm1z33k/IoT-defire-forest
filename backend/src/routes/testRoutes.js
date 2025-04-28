// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../firebase');

router.get('/firebase-check', async (req, res) => {
  try {
    const docRef = await db.collection('test').add({
      message: 'Firebase is working!',
      timestamp: new Date().toISOString()
    });

    const doc = await docRef.get();
    res.json({ success: true, id: doc.id, data: doc.data() });
  } catch (error) {
    console.error('🔥 Firebase connection error:', error);
    res.status(500).json({ success: false, message: 'Firebase connection failed', error });
  }
});

module.exports = router;