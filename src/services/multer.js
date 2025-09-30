import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import {createError} from '../utils/errorUtils.js'
import { s3BaseURL, s3BucketName } from '../config/appconfig.js';
import s3Client from '../config/s3Clint.js';

dotenv.config();

// ✅ Multer Configuration: Only allow images
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(createError({
                message: 'Invalid file type. Only images are allowed.',
                statusCode: 400,
            }));
        }
    },
});

/**
 * ✅ Upload an image to AWS S3
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} fileName - Original file name
 * @param {string} mimeType - File MIME type
 * @returns {Promise<{ url: string, id: string, fileName: string }>}
 */
const uploadImageToS3 = async (fileBuffer, fileName, mimeType) => {
    try {
        const uniqueFileName = `images/${uuidv4()}_${path.basename(fileName)}`;
        const command = new PutObjectCommand({
            Bucket: s3BucketName,
            Key: uniqueFileName,
            Body: fileBuffer,
            ContentType: mimeType, // ✅ Automatically set correct content type
        });

        await s3Client.send(command);
        const url = `${s3BaseURL}${uniqueFileName}`;

        return { url, id: uniqueFileName, fileName };
    } catch (err) {
        console.error('❌ Error uploading image to S3:', err);
        throw new Error('Failed to upload image');
    }
};

export { upload, uploadImageToS3 };
