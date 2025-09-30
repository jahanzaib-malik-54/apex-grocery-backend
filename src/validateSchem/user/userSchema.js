import Joi from 'joi';
const updateProfileSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).messages({
        'string.base': 'First name must be a string.',
        'string.min': 'First name should have at least 2 characters.',
        'string.max': 'First name should not exceed 50 characters.',
    }),
    lastName: Joi.string().min(2).max(50).messages({
        'string.base': 'Last name must be a string.',
        'string.min': 'Last name should have at least 2 characters.',
        'string.max': 'Last name should not exceed 50 characters.',
    }),
    email: Joi.string().email().messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Please provide a valid email address.',
    }),
    phone: Joi.string()
        .pattern(/^\d{11}$/)
        .messages({
            'string.pattern.base': 'Phone number must be exactly 11 digits.',
        }),
    address: Joi.string().min(5).max(255).messages({
        'string.base': 'Address must be a string.',
        'string.min': 'Address should be at least 5 characters.',
        'string.max': 'Address should not exceed 255 characters.',
    }),
    currentPassword: Joi.string().min(8).max(100).messages({
        'string.base': 'Current password must be a string.',
        'string.min': 'Current password should have at least 8 characters.',
        'string.max': 'Current password should not exceed 100 characters.',
    }),
    newPassword: Joi.string()
        .min(8)
        .max(100)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
        .messages({
            'string.base': 'New password must be a string.',
            'string.min': 'New password should have at least 8 characters.',
            'string.max': 'New password should not exceed 100 characters.',
            'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        }),
    confirmPassword: Joi.any()
        .valid(Joi.ref('newPassword'))
        .messages({
            'any.only': 'Confirm password must match new password.',
        }),
});

export default updateProfileSchema;

export const updateUserSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).optional().messages({
        'string.base': 'First name must be a string.',
        'string.min': 'First name should have at least 2 characters.',
        'string.max': 'First name should not exceed 50 characters.',
    }),
    lastName: Joi.string().min(2).max(50).optional().messages({
        'string.base': 'Last name must be a string.',
        'string.min': 'Last name should have at least 2 characters.',
        'string.max': 'Last name should not exceed 50 characters.',
    }),
    
    phone: Joi.string()
        .pattern(/^\d{11}$/)
        .optional()
        .messages({
            'string.pattern.base': 'Phone number must be exactly 11 digits.',
        }),
    address: Joi.object({
        street: Joi.string().min(2).max(100).optional().messages({
            'string.base': 'Street must be a string.',
            'string.min': 'Street should have at least 2 characters.',
            'string.max': 'Street should not exceed 100 characters.',
        }),
        city: Joi.string().min(2).max(100).optional().messages({
            'string.base': 'City must be a string.',
            'string.min': 'City should have at least 2 characters.',
            'string.max': 'City should not exceed 100 characters.',
        }),
        postalCode: Joi.string().min(2).max(20).optional().messages({
            'string.base': 'Postal code must be a string.',
            'string.min': 'Postal code should have at least 2 characters.',
            'string.max': 'Postal code should not exceed 20 characters.',
        }),
        country: Joi.string().min(2).max(100).optional().messages({
            'string.base': 'Country must be a string.',
            'string.min': 'Country should have at least 2 characters.',
            'string.max': 'Country should not exceed 100 characters.',
        }),
    }).optional(),
}).unknown(false);


export const updateUserInfoSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).optional().messages({
        'string.base': 'First name must be a string.',
        'string.min': 'First name should have at least 2 characters.',
        'string.max': 'First name should not exceed 50 characters.',
    }),
    lastName: Joi.string().min(2).max(50).optional().messages({
        'string.base': 'Last name must be a string.',
        'string.min': 'Last name should have at least 2 characters.',
        'string.max': 'Last name should not exceed 50 characters.',
    }),
    
    phone: Joi.string()
        .pattern(/^\d{11}$/)
        .optional()
        .messages({
            'string.pattern.base': 'Phone number must be exactly 11 digits.',
        }),
        email: Joi.string().email().optional().messages({
            'string.base': 'Email must be a string.',
            'string.email': 'Please provide a valid email address.',
        }),    
}).unknown(false);