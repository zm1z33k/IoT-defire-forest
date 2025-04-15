const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, role(['admin']), createUser);
router.get('/', auth, role(['admin']), getUsers);

module.exports = router;