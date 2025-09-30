import Joi from 'joi';

// Signup validation schema
export const signupSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
        'string.base': 'First name must be a string.',
        'string.empty': 'First name is required.',
        'string.min': 'First name should have at least 2 characters.',
        'string.max': 'First name should not exceed 50 characters.',
        'any.required': 'First name is required.',
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
        'string.base': 'Last name must be a string.',
        'string.empty': 'Last name is required.',
        'string.min': 'Last name should have at least 2 characters.',
        'string.max': 'Last name should not exceed 50 characters.',
        'any.required': 'Last name is required.',
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
    password: Joi.string().min(6).max(40).required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password should have at least 6 characters.',
        'string.max': 'Password should not exceed 40 characters.',
        'any.required': 'Password is required.',
    }),
    role: Joi.string().valid('admin', 'consumer').default('consumer').messages({
        'any.only': "Role must be either 'admin' or 'consumer'.",
    }),
})
    .or('email', 'phone')
    .messages({
        'object.missing': 'Either email or phone is required.',
    });

// Login validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email().messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Please provide a valid email address.',
    }),
    phone: Joi.string()
        .pattern(/^\d{11}$/)
        .messages({
            'string.pattern.base': 'Phone number must be  11  digits.',
        }),
    password: Joi.string().required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.',
    }),
})
    .or('email', 'phone')
    .messages({
        'object.missing': 'Either email or phone is required.',
    });

    export const forgotPasswordSchema = Joi.object({
        email: Joi.string().email().required(),
    }).strict();
    
     export const refreshTokenSchema = Joi.object({
        refreshToken: Joi.string().required().messages({
            'any.required': 'Refresh Token is required',
        }),
    });

export const resetPasswordSchema = Joi.object({
    token: Joi.string()
        .required()
        .messages({
            'any.required': 'Token is required.',
            'string.empty': 'Token cannot be empty.',
        }),

    newPassword: Joi.string()
        .min(6) 
        .max(40) 
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'any.required': 'New password is required.',
            'string.empty': 'New password cannot be empty.',
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password cannot exceed 32 characters.',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        }),
});
    

export const signupAdminSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
        'string.base': 'First name must be a string.',
        'string.empty': 'First name is required.',
        'string.min': 'First name should have at least 2 characters.',
        'string.max': 'First name should not exceed 50 characters.',
        'any.required': 'First name is required.',
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
        'string.base': 'Last name must be a string.',
        'string.empty': 'Last name is required.',
        'string.min': 'Last name should have at least 2 characters.',
        'string.max': 'Last name should not exceed 50 characters.',
        'any.required': 'Last name is required.',
    }),
    email: Joi.string().email().messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Please provide a valid email address.',
    }),
    phone: Joi.string()
        .pattern(/^\d{11}$/)
        .messages({
            'string.pattern.base': 'Phone number must be exactly 11 digits.',
            'any.required': 'phone  is required.',

        }),
        // password: Joi.string().min(6).max(40).default('Testing1$'),
        
    role: Joi.string().default('admin').messages({
        'any.only': "Role must be an 'admin' ",
    }),
})

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .min(6)
        .max(40)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'any.required': 'current password is required.',
            'string.empty': 'current password cannot be empty.',
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password cannot exceed 40 characters.',
            'string.pattern.base':
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        }),

    newPassword: Joi.string()
        .min(6)
        .max(40)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'any.required': 'New password is required.',
            'string.empty': 'New password cannot be empty.',
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password cannot exceed 40 characters.',
            'string.pattern.base':
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        }),
});