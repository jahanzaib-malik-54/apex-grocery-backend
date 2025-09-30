import Joi from 'joi';

 export const createproductSchema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required().messages({
        'string.empty': 'Product name is required',
        'string.min': 'Product name must be at least 3 characters',
        'string.max': 'Product name cannot exceed 100 characters',
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': 'Product description is required',
        'string.min': 'Description should be at least 10 characters',
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be a positive number',
        'any.required': 'Product price is required',
    }),
    category: Joi.string().trim().min(3).max(100).required().messages({
        'string.empty': 'Product category is required',
        'string.min': 'Category must be at least 3 characters',
        'string.max': 'Category cannot exceed 100 characters',
    }),
    size: Joi.string().valid('XS', 'S', 'M', 'L', 'XL').required().messages({
        'any.only': 'Size must be one of XS, S, M, L, XL',
        'any.required': 'Size is required',
    }),
    image: Joi.any() 
});
 

export const deleteProductImageSchema = Joi.object({

    imageId: Joi.string().required().messages({
        'string.base': 'Image ID must be a string.',
        'string.empty': 'Image ID is required.',
        'any.required': 'Image ID is required.',
    }),
});

