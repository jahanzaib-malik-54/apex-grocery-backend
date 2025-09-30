import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3BucketName } from '../config/appconfig.js';
import s3Client from '../config/s3Clint.js';

/**
 * ✅ Delete an image from AWS S3
 * @param {string} imageId - The S3 object key (e.g., "images/xxxx-filename.webp")
 */
export const deleteImageFromS3 = async (imageId) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: s3BucketName,
            Key: imageId, // The ID stored in your database
        });

        const response = await s3Client.send(command);
        return response;
    } catch (err) {
        console.error('❌ Error deleting image from S3:', err);
        throw new Error('Failed to delete image from S3');
    }
};
