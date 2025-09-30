import { normalizeProducts } from '../helper.js';
import User from '../models/authModel.js';
import { createError } from '../utils/errorUtils.js';
import { sendSuccessResponse } from '../utils/successUtils.js';

export const addToFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; 

        const user = await User.findById(userId);
        if (user.favorites.includes(id)) {
            return sendSuccessResponse(res, null, {
            message: 'Product is already in favorites',
        });
        }

        user.favorites.push(id);
        await user.save();

        return sendSuccessResponse(res, null, {
            message: 'Product added to favorites successfully',
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error adding to favorites', error: error.message });
    }
};

// Remove from favorites
export const removeFromFavorites = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Find user
        const user = await User.findById(userId);
        
        if (!user.favorites.includes(id)) {
            const error = createError({
                message: 'Product is not in favorites',
                statusCode: 404,
            });
            return next(error);
        }

        // Remove the product from favorites
        user.favorites = user.favorites.filter((item) => item.toString() !== id);
        await user.save();

        return sendSuccessResponse(res, null, {
            message: 'Product removed from favorites successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error removing from favorites', error: error.message });
    }
};

// Get all favorites
export const getAllFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('favorites');

        
        if (!user.favorites || user.favorites.length === 0) {
            return sendSuccessResponse(res, [], {
                message: 'Product fetch successfully',
            });
        }

        return res.status(200).json({
            message: 'Favorites fetched successfully',
            data: normalizeProducts(user.favorites),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching favorites', error: error.message });
    }
};


// Delete all favorites
export const clearAllFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user
        const user = await User.findById(userId);

        if (user.favorites.length === 0) {
            return sendSuccessResponse(res, null, { message: 'Already clear' });

        }

        user.favorites = [];
        await user.save();

        return sendSuccessResponse(res, null, {
            message: 'All favorites cleared successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error clearing favorites', error: error.message });
    }
};
