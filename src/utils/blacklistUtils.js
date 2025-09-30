import jwt from 'jsonwebtoken';
import { createError } from './errorUtils.js';
import BlacklistedTokenSchema from '../models/blacklistToken.js';

 export const blacklistToken = async (token) => {
    try {
        const decoded = jwt.decode(token);
        console.log("🚀 ~ blacklistToken ~ decoded:", decoded)

        if (!decoded?.exp) {
            throw new Error('Invalid token');
        }

        const expiresAt = new Date(decoded.exp * 1000); // Convert exp to milliseconds
        await BlacklistedTokenSchema.create({ token, expiresAt });
        return true;
    } catch (error) {
        throw createError({
            message: 'Failed to blacklist token',
            statusCode: 500,
            value: error.message,
        });
    }
};
