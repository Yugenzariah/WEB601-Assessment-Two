// Handles user registration and login API routes
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Register new user
router.post('/register', registerUser);

// Login user and return JWT token
router.post('/login', loginUser); 

module.exports = router;