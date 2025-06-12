const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, getMe } = require('../controllers/authController');

const router = express.Router();

// Routes
router.get('/me', authMiddleware, getMe);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;