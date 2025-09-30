import mongoose from 'mongoose';

// Define Blacklisted Token Schema
const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true, // Prevent duplicate tokens
    },
    expiresAt: {
        type: Date,
        required: true, // Token expiry date
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically add creation date
    },
});

// TTL Index: Automatically delete tokens after their expiration time
blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const BlacklistedTokenSchema = mongoose.model(
    'BlacklistedToken',
    blacklistedTokenSchema
);

export default BlacklistedTokenSchema;
