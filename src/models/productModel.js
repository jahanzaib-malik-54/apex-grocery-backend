import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            minLength: [3, 'Product name must be at least 3 characters'],
            maxLength: [100, 'Product name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            minLength: [10, 'Description should be at least 10 characters'],
            trim: true,

        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price must be a positive number'],
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
            trim: true,
            minLength: [3, 'Category must be at least 3 characters'],
            maxLength: [100, 'Category cannot exceed 100 characters'],
        },
        size: {
            type: String,
            enum: ['XS', 'S', 'M', 'L', 'XL'],
            required: [true, 'Size is required'],
            trim: true,

        },
        productId: { 
            type: String,
            unique: true,
            required: true }, 

            images: [
                {
                    id: String,
                    fileName: String,
                    url: String,
                },
            ],
         
         quantity: {
            type: Number,
            required: true,
            min: [0, 'Quantity cannot be negative'],
            default: 1,
        }, 

    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
