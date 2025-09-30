import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
    createProduct,
    deleteProduct,
    deleteProductImage,
    getAllProducts,
    getProductById,
    updateProduct
} from '../controllers/productController.js';
import updateProductSchema from "../validateSchem/productSchems/updateProductSchema.js";
import { checkAdmin } from '../middlewares/adminMiddlewares.js';
import { createproductSchema,deleteProductImageSchema } from '../validateSchem/productSchems/createproductSchema.js'
import { queryMiddleware } from '../middlewares/queryMiddleware.js';
import { upload } from '../services/multer.js';
import { validateImage } from '../middlewares/imageMiddleware.js';

const productRouter = express.Router();

const filterableFields = {
    name: { type: 'text' },
    productID: { type: 'text' },
    size: { type: 'text' },
};

const sortableFields = [
    'name',
    'price',
    'productStock',
    'productID',
];

productRouter.get(
    '/all',
    verifyToken,
    queryMiddleware(filterableFields, sortableFields),
    getAllProducts
);
productRouter.get('/:id', 
    verifyToken,
    getProductById);

// ✅ Create product (with image upload to S3)
productRouter.post(
    '/create',
    verifyToken,          
    checkAdmin,          
    upload.single('image'), 
    validateImage,        
    validateRequest(createproductSchema), 
    createProduct     
);
productRouter.delete(
    '/:id/deleteImage',
    verifyToken,
    checkAdmin,
    validateRequest(deleteProductImageSchema),
    deleteProductImage
)

// ✅ Update product
productRouter.patch(
    '/update/:id',
    verifyToken,
    checkAdmin,
    validateRequest(updateProductSchema),
    updateProduct)
productRouter.delete('/delete/:id',
    verifyToken,
    checkAdmin,
    deleteProduct)

export default productRouter;
