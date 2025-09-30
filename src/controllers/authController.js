import jwt from 'jsonwebtoken';
import User from '../models/authModel.js';
import { sendSuccessResponse } from '../utils/successUtils.js';
import { generateTokens } from '../utils/tokenUtils.js';
import { createError } from '../utils/errorUtils.js';
import { REFRESH_TOKEN_EXPIRY, refreshTokenSecret } from '../config/appconfig.js';
import { 
        changePasswordConfirmationEmailTemplate, 
        forgotPasswordEmailTemplate 
        } from '../utils/emailUtils.js';
import { blacklistToken } from '../utils/blacklistUtils.js';
import { createFullName, generateRandomPassword } from '../helper.js';
import sendAdminWelcomeEmail from '../utils/adminWellcomeEmail.js';
import { sendConsumerWelcomeEmail } from '../utils/consonsumerWellcomeEmail.js';
import { sendEmailToUser } from '../utils/senderEmail.js';
import {createExpiryTimestamp} from '../utils/dateUtils.js'
export async function signup(req, res, next) {
    try {
        const { firstName, lastName, email, phone, password } = req.body || {};
        const role = req.path.includes('admin') ? 'admin' : 'consumer';

        const randomString = generateRandomPassword();

        const userPassword = role === 'admin' ? randomString : password;

        if (!userPassword) {
            return next(createError({ message: 'Password is required', statusCode: 400 }));
        }

        if (email && (await User.findOne({ email }))) {
            return next(createError({ message: 'Email already exists', statusCode: 409 }));
        }
        if (phone && (await User.findOne({ phone }))) {
            return next(createError({ message: 'Phone number already exists', statusCode: 409 }));
        }


        const newUser = new User({
            firstName,
            lastName,
            ...(email && { email }),
            ...(phone && { phone }),
            password: userPassword,
            role,
            name: createFullName({ firstName, lastName }), // match your helper usage
        });

        // Save user to the database
        await newUser.save();

        // Send admin welcome email
        if (role === 'admin' && email) {
            const portalBaseUrl = 'https://apex-grocery-v1.vercel.app'; 
            
            await sendAdminWelcomeEmail(newUser, randomString, portalBaseUrl);
        } else if (role === 'consumer' && email) {

            await sendConsumerWelcomeEmail(newUser); 
        }

        // Send success response
        return sendSuccessResponse(res, null, {
            message: role === 'admin' ? 'Admin user created successfully and welcome email sent' : 'User created successfully',
        });
    } catch (error) {
        next(
            createError({
                message: error.message || 'Internal server error',
                statusCode: 500,
            })
        );
    }
}




export async function login(req, res, next) {
    try {
        const { email, phone, password } = req.body || {};

        if (!email && !phone) {
            return next(createError({
                message: 'Email or phone number is required to log in',
                statusCode: 400,
            }));
        }

        const user = await User.findOne({
            $or: [email && { email }, phone && { phone }].filter(Boolean),
        });

        if (!user || !(await user.comparePassword(password))) {
            return next(createError({
                message: 'Invalid email/phone or password, please try again',
                statusCode: 401,
            }));
        }

        const { accessToken, refreshToken } = generateTokens(user);

        user.refreshTokens.push({
            token: refreshToken,
            expiresAt: createExpiryTimestamp(REFRESH_TOKEN_EXPIRY), // e.g., 7 days
        });

        await user.save();

        return res.status(200).json({
            message: 'Login successful',
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return next(createError({
            message: `Internal server error: ${error.message}`,
            statusCode: 500,
        }));
    }
}


export async function refreshToken(req, res, next) {
    try {
        const { refreshToken } = req.body;

        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
            if (err) {
                return next(createError({ message: 'Invalid or expired refresh token', statusCode: 403 }));
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return next(createError({ message: 'User not found', statusCode: 404 }));
            }

            const tokens = generateTokens(user);

            return sendSuccessResponse(res, tokens, { message: 'Token refreshed successfully' });
        });
    } catch (error) {
        return next(createError({ message: 'Internal Server Error', statusCode: 500 ,error:error.message}));
    }
}


export async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return sendSuccessResponse(res, null, {
                message: 'If your email exists in our system, you will receive password reset instructions.',
            });
        }

        // Create reset token (expires in 1 hour)
        const resetToken = jwt.sign({ id: user._id }, refreshTokenSecret, { expiresIn: '1h' });

        // Save token and expiration in the database
        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const { name, role } = user;
        const resetLink = `${resetToken}`;

        const subject = `${name}, your requested password update`;
        const text = `Hi ${name},\n\nYou requested to reset your password.
                     Your reset link will expire in 1 hour.\n\nBest regards,\nThe Team`;

        // Send reset email
        await sendEmailToUser(email, subject, text, forgotPasswordEmailTemplate(name, role, resetLink));

        console.log('🚀 ~ Reset Link:', resetLink);

        return sendSuccessResponse(res, null, { message: 'Password reset link sent to your email.' });
    } catch (error) {
        return next(createError({ message: 'Internal Server Error', statusCode: 500, error: error.message }));
    }
}


export async function resetPassword(req, res, next) {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return next(createError({ message: 'Token and new password are required', statusCode: 400 }));
        }

        console.log('🔍 Received token:', token);

        // Find the user with the matching resetToken
        const user = await User.findOne({ resetToken: token });

        if (!user) {
            console.error('❌ No user found with provided token');
            return next(createError({ message: 'Invalid token.', statusCode: 403 }));
        }

        // Update password and clear reset token
        user.password = newPassword;
        user.resetToken = undefined; // Clear token after reset
        await user.save();

        return sendSuccessResponse(res, null, { message: 'Password reset successfully' });
    } catch (error) {
        console.error('❌ Internal Server Error:', error);
        return next(createError({ message: 'Internal Server Error', statusCode: 500, error: error.message }));
    }
}

export async function logout(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        const { refreshToken } = req.body;

        const accessToken = authHeader.split(' ')[1];

        // Validate Refresh Token
        if (!refreshToken) {
            return next(createError({ message: 'Refresh token required', statusCode: 401 }));
        }

        try {
            await Promise.all([
                blacklistToken(accessToken).catch(err => console.warn('Access token already blacklisted or error:', err)),
                blacklistToken(refreshToken).catch(err => console.warn('Refresh token already blacklisted or error:', err))
            ]);
        } catch (blacklistError) {
            console.error('Blacklist Error:', blacklistError);
        }

        return sendSuccessResponse(res, null, { message: 'Logout successfully' });
    } catch (error) {
        console.error('Logout Error:', error);
        return next(createError({ message: 'Failed to logout', statusCode: 500, error: error.message }));
    }
}
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        const isValidPassword = await user.comparePassword(currentPassword);
        if (!isValidPassword) {
            const error = createError({
                message: 'Current password is incorrect',
                statusCode: 400,
                param: 'currentPassword',
                value: currentPassword,
            });
            return next(error);
        }

        // Update password
        user.password = newPassword;
        const { email, name } = user;

        const subject = `${name}, your password has been updated`;
        const text = `Hi ${name},\n\nYour password has been changed successfully. If you didn't make this change, please contact support immediately.\n\nBest regards,\nThe Team`;

        await sendEmailToUser(email, subject, text, changePasswordConfirmationEmailTemplate(name));
        
        await user.save();

        return sendSuccessResponse(res, null, { message: 'Password updated successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        return next(createError({ message: 'Internal Server Error', error: error.message }));
    }
};
