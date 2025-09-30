import { generateProductId, normalizeProduct} from '../helper.js';
import Product from '../models/productModel.js';
// import { uploadImg } from '../services/multer.js';
import { createError, notFoundError } from '../utils/errorUtils.js';
import {  normalizeProductResponse, normalizeSingleProduct, sendSuccessResponse } from '../utils/successUtils.js';
import { uploadImageToS3 } from '../services/multer.js'; 
import { deleteImageFromS3 } from '../services/deleteImageS3.js';
import { getPaginationMetadata } from '../utils/queryUtils.js';

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, size, quantity } = req.body;

        let imageData = [];

        // If an image is provided, upload it to S3 and prepare the image data
        if (req.file) {
            const { buffer, originalname, mimetype } = req.file;
            const uploadedImage = await uploadImageToS3(buffer, originalname, mimetype);

            imageData.push({
                id: uploadedImage.id,
                fileName: originalname,
                url: uploadedImage.url,
            });
        }

        // Check if the product already exists by name, category, and size
        const existingProduct = await Product.findOne({ name, category, size });

        if (existingProduct) {
            // If product exists, update quantity
            existingProduct.quantity += parseInt(quantity) || 1;
            await existingProduct.save();

            return res.status(200).json({
                message: 'Product quantity updated successfully',
                data: normalizeProduct(existingProduct),
            });
        }

        // Generate new product ID
        const newProductId = await generateProductId();

        const newProduct = new Product({
            productId: newProductId,
            name,
            description,
            price,
            category,
            size,
            quantity: parseInt(quantity) || 1,
            images: imageData, // Add image only if it exists
        });

        await newProduct.save();

        return sendSuccessResponse(res, normalizeProductResponse(newProduct), {
            message: 'Product created successfully!',
        });

    } catch (error) {
        return next(
            createError({
                message: 'Error creating product!',
                statusCode: 500,
                error: error.message
            })
        );
    }
};


export const deleteProductImage = async (req, res , next) => {
    const { imageId } = req.body;
    const { id } = req.params;
        
    
    try {
        // Find the product using the correct _id field
        const product = await Product.findById(id);
        
        if (!product) {
            return next(notFoundError(product, { message: 'Product Not Found' }));
        }
    
        // Ensure product.images exists and is an array before calling .find()
        if (!Array.isArray(product.images)) {
            return next(notFoundError({ message: 'Product images not found or invalid' }));
        }
    
        const image = product.images.find(img => img.id === imageId);

        if (!image) {
            return next(notFoundError({ message: 'Image not found' }));
        }  

        // Delete image from AWS S3
        const response = await deleteImageFromS3(image.id);

        // Check if the response indicates success (204 status code)
        if (response.$metadata.httpStatusCode === 204) {
            // Remove the image from the product's images array
            product.images = product.images.filter(img => img.id !== imageId);
            await product.save();

            return sendSuccessResponse(res, null, { message: 'Image deleted successfully' });
        } else {
            return next({ message: 'Failed to delete image from S3' });
        }

    } catch (error) {
        return next(
            createError({
            message: ' Error deleting Image',
            statusCode: 500, error: error.message 
        }));    
    }
};

// Get Product by ID
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            const error = createError({
                message: 'Product not found',
                statusCode: 404,
            });
            return next(error);
        }

        return sendSuccessResponse(res, normalizeSingleProduct(product));

    } catch (error) {
        return next(
            createError({
            message: ' Error Fetching product!',
            statusCode: 500, error: error.message 
        }));   
     }
};

export const getAllProducts = async (req, res, next) => {
    const { query, sort, skip, limit } = req.queryConfig;
    try {
        const [products, total] = await Promise.all([
            Product.find(query)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .select('-__v')
                .lean(),
            Product.countDocuments(query),
        ]);
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
            message: ' Error Fetching product!',
            statusCode: 500,
             error: error.message 
        }));
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            const error = createError({
                message: 'Product not found',
                status: 404,
            });
            return next(error);
        }
        return sendSuccessResponse(res, null, {
            message: 'Product deleted successfully',
        });
    } catch (error) {
        return next(
            createError({
            message: ' Error deleting product',
            statusCode: 500, error: error.message 
        }));
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { price, size } = req.body;

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(id,
             {  price, size },
             { new: true, runValidators: true });

        if (!updatedProduct) {
            return next(createError({ message: 'Product not found', status: 404 }));
        }
        res.status(200).json({ message: ' product fetch successfully', data: normalizeProduct(updatedProduct)});

    } catch (error) {
        return next(
            createError({
            message: ' Error update product',
            statusCode: 500, error: error.message 
        }));    }
};
