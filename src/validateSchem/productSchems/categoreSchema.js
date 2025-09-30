import Joi from 'joi';

 export const categoryByIdSchema = Joi.object({
    category: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .messages({
            'string.base': 'Category must be a string.',
            'string.empty': 'Category is required.',
            'string.min': 'Category must be at least 3 characters long.',
            'string.max': 'Category cannot exceed 100 characters.',
            'any.required': 'Category is required.',
        }),
});
