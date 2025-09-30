import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { awsRegion, awsS3AccessKeyId, awsS3SecretAccessKey } from './appconfig.js';
dotenv.config();

const s3Client = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsS3AccessKeyId,
        secretAccessKey: awsS3SecretAccessKey,
    },
});

export default s3Client;
