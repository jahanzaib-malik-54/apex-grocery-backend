// import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";

export const handleRole = (req, res, next) => {
    req.role = req.path.includes('admin') ? 'admin' : 'consumer';
    next(); 
};



// Normalize a single product
export const normalizeProduct = (product) => {
    if (!product) return null;

    return {
        quantity: product.quantity,
        productId: product.productId,
        images: Array.isArray(product.images) ? product.images.map(img => ({
            id: img.id,
            fileName: img.fileName,
            url: img.url,
        })) : [],
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        size: product.size,
        category: product.category,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    };
};


// Normalize an array of products
export const normalizeProducts = (products) => {
    if (!Array.isArray(products)) return [];

    return products.map((product) => normalizeProduct(product));
};


// Normalize cart data
export const normalizeCartResponse = (cart) => {
    return cart.map((item) => ({
        id: item._id,
        quantity: item.quantity,
        product: {
            images: Array.isArray(item.images) ? item.images.map(img => ({
                id: img.id,
                fileName: img.fileName,
                url: img.url,
            })) : [],
            id: item.productId._id,
            name: item.productId.name,
            description: item.productId.description,
            price: item.productId.price,
            category: item.productId.category,
            size: item.productId.size,
            createdAt: item.productId.createdAt,
            updatedAt: item.productId.updatedAt,
        },
    }));
};


export const generateProductId = async () => {
    const lastProduct = await Product.findOne().sort({ createdAt: -1 });

    if (!lastProduct || !lastProduct.productId) {
        return "AG00001"; // Default for the first product
    }

    const lastIdNumber = parseInt(lastProduct.productId.replace("AG", ""), 10); 
    const nextIdNumber = lastIdNumber + 1; 
    return `AG${String(nextIdNumber).padStart(5, '0')}`; 
};


export function createFullName({ firstName = '', lastName = '' }) {
    return `${String(firstName).trim()} ${String(lastName).trim()}`.trim();
}

const excludedFields = [
    'password',
    'refreshTokens',
    'passwordResetExpires',
    'passwordResetToken',
    'fcmToken',
    'resetToken',
    'resetTokenExpires',
];

export const sanitizeUserData = (user) => {
    if (!user) return null;
    // Convert Mongoose document to plain object (if applicable)

    const {
        _id,
        __v,
        address,
        deliveryAddress,
        isNotificationsEnabled,
        ...userObject
    } = user?.toObject ? user.toObject() : user || {};
    const { _id: addressId, ...addressObject } = address || {};
    const { _id: deliveryAddressId, ...deliveryAddressObject } =
        deliveryAddress || {};
    // Exclude protected fields
    excludedFields.forEach((field) => delete userObject[field]);
    const normalizedData = {
        id: _id,
        isNotificationsEnabled,
        ...userObject,
    };
    if (addressId) {
        normalizedData.address = { id: addressId, ...addressObject };
    }
    if (deliveryAddressId) {
        normalizedData.deliveryAddress = {
            id: deliveryAddressId,
            ...deliveryAddressObject,
        };
    }
    return normalizedData;
};

export const generateRandomPassword = () => {
    // Define character sets
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChracter = '!@#$%&*'
    const allCharacters = upperCase + lowerCase + numbers + specialChracter;

    let password = '';

    // Ensure at least one uppercase, one lowercase, and one number
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += specialChracter.charAt(Math.floor(Math.random() * specialChracter.length));

    // Fill the remaining 5 characters with random characters from the full set
    for (let i = password.length; i < 8; i++) {
        password += allCharacters.charAt(
            Math.floor(Math.random() * allCharacters.length)
        );
    }

    // Shuffle the password to ensure randomness
    password = password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');

    return password;
};