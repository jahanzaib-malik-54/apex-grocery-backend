import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRY, accessTokenSecret, REFRESH_TOKEN_EXPIRY, refreshTokenSecret } from "../config/appconfig.js";

export const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        accessTokenSecret,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        refreshTokenSecret,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
};

export const getTokenFromRequest = (req) => {
    const token = req.header('Authorization')?.replace(/^bearer\s+/i, '');
    return token;
};
