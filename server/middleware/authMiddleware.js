const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Assumes token is sent as "Bearer <token>"
    
    if (!token) {
        return res.status(403).json({ message: 'Authentication token required.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
        req.user = decoded; // Add the decoded user info to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
