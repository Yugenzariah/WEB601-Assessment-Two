// Controller functions for user registration and login
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    const { email, passowrd } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ email, password });
        await user.save();

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(payload, process.env.JWT_Secret, {expiresIn: '7d'} , (err, token) => {
            if (err) throw err;
            res.json({ token }); // Return JWT token on successful registration
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login an existing user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(payload, process.env.JWT_Secret, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token }); // Return JWT token on successful login
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};