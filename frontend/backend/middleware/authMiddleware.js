const jwt = require('jsonwebtoken');
const { MESSAGES, HTTP_STATUS } = require('../constants');

exports.verifyToken = (req, res, next) => {
    try {
        // Check if cookies exist
        if (!req.cookies || !req.cookies.jwt) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.UNAUTHORIZED
            });
        }

        const token = req.cookies.jwt;
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: MESSAGES.INVALID_TOKEN
                });
            }
            
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: MESSAGES.INVALID_TOKEN
        });
    }
};