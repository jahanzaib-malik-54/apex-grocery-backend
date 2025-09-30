import Product from "../models/productModel.js";
import { createError } from "../utils/errorUtils.js";
import { getPaginationMetadata } from "../utils/queryUtils.js";
import { normalizeProductResponse, sendSuccessResponse } from "../utils/successUtils.js";

export const getProductCategories = async (req, res, next) => {
    try {
        // Get distinct categories
        const categories = await Product.distinct('category');

        if (!categories.length) {
            return next(createError({ message: 'No categories found', status: 404 }));
        }

        // Fetch one image for each category
        const categoryWithImages = await Promise.all(
            categories.map(async (category) => {
                const product = await Product.findOne({ category }).select('images');
                return {
                    category,
                    images: product?.images || null,
                };
            })
        );

        return sendSuccessResponse(res, categoryWithImages, {
            message: 'Categories fetched successfully.',
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({
            message: 'Error fetching categories',
            error: error.message,
        });
    }
};


export const getProductsByCategory = async (req, res, next) => {
    try {
        const { query, sort, skip, limit } = req.queryConfig;
        const { category } = req.body;

        if (!category) {
            return next(
                createError({ message: 'Category is required', statusCode: 400 })
            );
        }

        // Add category to the query filter
        query.category = category;

        const [products, total] = await Promise.all([
            Product.find(query)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .select('-__v')
                .lean(),
            Product.countDocuments(query),
        ]);

        if (!products.length) {
            return next(
                createError({
                    message: `No products found for category '${category}'`,
                    statusCode: 404,
                })
            );
        }

        const pagination = getPaginationMetadata(
            total,
            req.query.page,
            req.query.rowsPerPage
        );

        return sendSuccessResponse(res, normalizeProductResponse(products), {
            pagination,
        });
    } catch (error) {
        return next(
            createError({
                message: 'Error fetching products by category',
                statusCode: 500,
                error: error.message,
            })
        );
    }
};
