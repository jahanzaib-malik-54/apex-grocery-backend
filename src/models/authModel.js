import mongoose from 'mongoose';
import allowedRoles from '../utils/role.js';
import bcrypt from 'bcrypt';
import { createFullName } from '../helper.js';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
            minLength: [2, 'First name must be at least 2 characters'],
            maxLength: [50, 'First name cannot exceed 50 characters'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
            minLength: [2, 'Last name must be at least 2 characters'],
            maxLength: [50, 'Last name cannot exceed 50 characters'],
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        },
        phone: {
            type: String,
            unique: true,
            sparse: true,
            match: [/^\d{11}$/, 'Phone number must be between 11 digits'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be at least 8 characters long'],
            validate: {
                validator: function (v) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
                },
                message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.',
            },
        },

        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        refreshTokens: [
            {
                token: { type: String },
                expiresAt: { type: Date },
            },
        ],

        address: {
            type: {
                street: {
                    type: String,
                    trim: true,
                },
                city: {
                    type: String,
                    trim: true,
                },
                postalCode: {
                    type: String,
                    trim: true,
                },
                country: {
                    type: String,
                    trim: true,
                },
            },
            required: false, 
        },

        resetPasswordToken: String,
        resetPasswordExpires: Date,
        resetToken: {
            type: String,
        },
        resetTokenExpires: {
            type: Date,
        },
        role: { type: String, enum: allowedRoles, default: 'user' },

        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        cart: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 },
            },
        ],
    },
    { timestamps: true }
);
UserSchema.pre('save', async function (next) {
    if (this.isModified('firstName') || this.isModified('lastName')) {
        const fullName = createFullName(this.firstName, this.lastName);
        if (fullName) {
            this.name = fullName;
        }
    }

    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (err) {
            return next(err);
        }
    }

    next();
});




UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', UserSchema);
export default User;
