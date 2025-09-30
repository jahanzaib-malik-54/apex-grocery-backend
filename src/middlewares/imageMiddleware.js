import { createError } from '../utils/errorUtils.js';
export const validateImage = (req, res, next) => {
    // If no image is provided, proceed without validation (it's not required)
    if (!req.file) {
        return next();  // No error, just proceed to the next middleware
    }

    // Allowed image MIME types
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

    // If the file is provided, check if the MIME type is valid
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return next(createError({ message: 'Invalid file type.', status: 400 }));
    }

    // Proceed to the next middleware if validation passes
    next();
};
