import { normalizeCartResponse } from '../helper.js';
import User from '../models/authModel.js';
import Product from '../models/productModel.js';
import { createError, notFoundError } from '../utils/errorUtils.js';
import { sendSuccessResponse } from '../utils/successUtils.js';

// Add to cart (supports multiple items)
export const addToCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId);

        const product = await Product.findById(id);
        if (!product) {
            return next(notFoundError({message:'product Not Found'}));
        }

        const existingItem = user.cart.find((item) => item.productId && item.productId.toString() === id);
        if (existingItem) {
            return sendSuccessResponse(res, null, { message: 'Product is already in the cart' });

            // return next(createError({ message: 'Product is already in the cart', statusCode: 200 }));
        }

        user.cart.push({ productId: id, quantity: 1 });
        await user.save();

        return sendSuccessResponse(res, null, { message: 'Product added to cart successfully' });
    } catch (error) {
        return next(createError({ message: 'Error adding to cart', statusCode: 500, value: error.message }));
    }
};

// Remove from cart
export const removeFromCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const product = await Product.findById(id);
        if (!product) {
            return next(notFoundError({mesage:'product Not Found' }));
        }
        const user = await User.findById(userId);

        // Check if the product exists in the cart
        const itemIndex = user.cart.findIndex((item) => item.productId && item.productId.toString() === id);
        if (itemIndex === -1) {
            return sendSuccessResponse(res, null, { message: 'Product not found in cart' });
        }

        user.cart = user.cart.filter((item) => item.productId && item.productId.toString() !== id);
        await user.save();

        return sendSuccessResponse(res, null, { message: 'Product removed from cart successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error remove to cart', error: error.message });
    }
};

// Get all cart items with product details
export const getAllCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('cart.productId');

        if (!user.cart.length) {
            return res.status(200).json({ message: 'Cart is empty', data: [] });
        }

        return res.status(200).json({
            message: 'Cart fetched successfully',
            data: normalizeCartResponse(user.cart),
        });
    } catch (error) {
        return next(createError({ message: 'Error fetching cart', statusCode: 500, value: error.message }));
    }
};

// Clear cart
export const clearCart = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (user.cart.length === 0) {
            return sendSuccessResponse(res, null, { message: 'Already clear' });
        }
        user.cart = [];
        await user.save();

        return sendSuccessResponse(res, null, { message: 'All cart items cleared successfully' });
    } catch (error) {
        return next(createError({ message: 'Error clearing cart', statusCode: 500, value: error.message }));
    }
};
