const jwt = require('jwt-simple');
const SECRET_KEY = '120330SERVICE@@';  // Use a strong secret key in production

// Middleware to check JWT token in protected routes
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.decode(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateJWT };
