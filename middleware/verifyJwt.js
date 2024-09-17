const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access denied. Invalid token.' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Access denied. Invalid token.' }); //forbidden
        req.user = decoded.id;
        next();
    });
};
module.exports = verifyToken;