import { createFullName, sanitizeUserData } from '../helper.js';
import User from '../models/authModel.js';
import { createError, notFoundError } from '../utils/errorUtils.js';
import { getPaginationMetadata } from '../utils/queryUtils.js';
import { sendSuccessResponse } from '../utils/successUtils.js';


export const getUsersList = async (req, res, next) => {
    try {
        const { query, sort, skip, limit } = req?.queryConfig || {};

        const [users, total] = await Promise.all([
            User.find(query).sort(sort).skip(skip).limit(limit).exec(),
            User.countDocuments(query),
        ]);

        const sanitizedUsers = users.map(sanitizeUserData);
        const pagination = getPaginationMetadata(
            total,
            req.query.page,
            req.query.rowsPerPage
        );
        // Return the users
        return sendSuccessResponse(res, sanitizedUsers, { pagination });
    } catch (error) {
        return next({
            message: 'Error fetching users',
            statusCode: 500,
            value: error.message,
        });
    }
};


export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return next(notFoundError({message:'user Not found'}));
        }
        return sendSuccessResponse(res, {
            message: "User fetched successfully",
            data: sanitizeUserData(user)
          });
          

    } catch (error) {
        return next(createError({ message: 'Error fetching user', statusCode: 500, value: error.message }));
    }
};


export const updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body ||{}

        const user = await User.findById(id);

        if (!user) {
            return next(
                notFoundError({
                message: 'User not found' })
            );
        }

        user.status = status;
        await user.save();

        return sendSuccessResponse(res, {
            message: "Status Update Successfully",
            data: sanitizeUserData(user)
          });
    } catch (error) {
        return next(createError({
            message: 'Error updating user status',
            statusCode: 500,
            value: error.message,
        }));
    }
};

export const updateUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        for (const key in updateData) {
            if (Object.prototype.hasOwnProperty.call(updateData, key)) {
                existingUser[key] = updateData[key];
            }
        }
        
        // Force name recompute regardless of isModified()
        existingUser.name = createFullName({
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
        });

        await existingUser.save();

        return sendSuccessResponse(res, {
            message: 'User information updated successfully.',
            data: sanitizeUserData(existingUser),
        });
    } catch (error) {
        return next(
            createError({
                message: 'Error updating user information.',
                statusCode: 500,
                value: error.message,
            })
        );
    }
};
