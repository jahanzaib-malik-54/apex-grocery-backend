import Joi from 'joi';

 const updateProductSchema = Joi.object({
    price: Joi.number()
        .min(0)
        .optional()
        .messages({
            'number.base': 'Price must be a number.',
            'number.min': 'Price must be a positive number.',
        }),

    size: Joi.string()
        .valid('XS', 'S', 'M', 'L', 'XL')
        .optional()
        .messages({
            'string.base': 'Size must be a string.',
            'any.only': 'Size must be one of the following values: XS, S, M, L, XL.',
        }),
});

export default updateProductSchema