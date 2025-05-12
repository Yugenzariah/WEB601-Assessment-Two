// Middleware to verify JWT token and protect private routes.
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No toke, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies the token
        req.user = decoded.user; // Attach user data to request
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};