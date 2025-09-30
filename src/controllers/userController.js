import { createFullName, sanitizeUserData } from '../helper.js';
import User from '../models/authModel.js';
import { blacklistToken } from '../utils/blacklistUtils.js';
import { notFoundError } from '../utils/errorUtils.js';
import {  sendSuccessResponse } from '../utils/successUtils.js';
import { getTokenFromRequest } from '../utils/tokenUtils.js';

export async function getMyUserInfo(req, res, next) {
    try {
        const userId = req.user.id;

        // Find user by ID & exclude password
        const user = await User.findById(userId);
        if (!user) {
            const error = notFoundError({message:'user not found' });
            return next(error);
        }
        return sendSuccessResponse(res, sanitizeUserData(user));

    } catch (error) {
        res.status(500).json({ message: 'Something went Wrong .', error: error.message });
    }
}


export const updateMyUserInfo = async (req, res) => {
    try {
        const userId = req.user.id; 
        const updateData = req.body;

        // Fetch the existing user from the database
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Iterate through updateData and update fields
        
        for (const key in updateData) {
            if (Object.prototype.hasOwnProperty.call(updateData, key)) {
                existingUser[key] = updateData[key];
            }
        }

        // Force name recompute regardless of isModified()
        if (existingUser.firstName || existingUser.lastName) {
            existingUser.name = createFullName({
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
            });
        }

        // Save the updated user
        await existingUser.save();

        // Send success response
        return sendSuccessResponse(res, {
            message: 'User updated successfully',
            data: sanitizeUserData(existingUser),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.', error: error.message });
    }
};

export const deleteMyAccount = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const token = getTokenFromRequest(req);

        const user = await User.findById(userId);

        if (!user) {
            const error = notFoundError({message:'user not found' });
            return next(error);
        }

        // Delete the user permanently
        await User.findByIdAndDelete(userId);

        await blacklistToken(token, next);


        return sendSuccessResponse(res, null,{ 
            message: 'User account deleted permanently.'
        });

    } catch (error) {
        next(error); // Forward error to the global error handler

    }    
};
