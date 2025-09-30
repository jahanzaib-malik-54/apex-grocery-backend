import jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../config/appconfig.js';
import BlacklistedToken from '../models/blacklistToken.js';
import { createError } from '../utils/errorUtils.js';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(createError({ message: 'Access token required', statusCode: 401 }));
        }

        const token = authHeader.split(' ')[1];

        // Ensure secret is loaded
        if (!accessTokenSecret) {
            return next(createError({ message: 'Server configuration error', statusCode: 500 }));
        }

        // Check blacklist
        const blacklisted = await BlacklistedToken.findOne({ token });
        if (blacklisted) {
            return next(createError({ message: ' Unauthorized Token is blacklisted please login again', statusCode: 401 }));
        }

        jwt.verify(token, accessTokenSecret, (err, decoded) => {
            if (err && req.path !== '/logout') {
                return next(createError({ message: 'Invalid or expired token', statusCode: 401 }));
            } 
            req.user = decoded;
            next();
        });
    } catch (error) {
        return next(createError({ message: 'Internal server error', statusCode: 500 ,error: error.message}));
    }
};
