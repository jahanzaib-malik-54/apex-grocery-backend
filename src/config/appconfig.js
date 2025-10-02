import dotenv from 'dotenv';
dotenv.config(); 

// Must be declared at the top before any usage
const nodeEnv = process.env.NODE_ENV || 'development';
const isDevelopment = nodeEnv === 'development';

export const ACCESS_TOKEN_EXPIRY = '25m';
export const REFRESH_TOKEN_EXPIRY = '7d';
export const isProduction = process.env.NODE_ENV === 'production';

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const SENDER_EMAIL_USER = process.env.EMAIL_USER;
export const SENDER_EMAIL_PASS = process.env.EMAIL_PASS;
export const sesSenderEmail = process.env.SES_SENDER_EMAIL || 'info@apex-grocery.com';

export const awsRegion = process.env.AWS_REGION;
export const awsS3AccessKeyId = process.env.AWS_ACCESS_KEY_ID;
export const awsS3SecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const s3BucketName = process.env.AWS_BUCKET_NAME;
export const s3BaseURL = `https://${s3BucketName}.s3.${awsRegion}.amazonaws.com/`;

export const APP_PACKAGE_NAME = 'com.td.apexGrocery';

export const prodApiUrl = 'https://apex-grocery-backend.vercel.app';

export const openApexGroceryAppLink = prodApiUrl + '/open-app/open-apex-grocery-v1.vercel.app';

export const portalBaseUrl = isDevelopment
  ? 'http://localhost:5173'
  : prodApiUrl;

export const portalResetPasswordLink = `${portalBaseUrl}/reset-password`;
