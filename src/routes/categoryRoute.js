import express from 'express';
import { getProductCategories, getProductsByCategory } from '../controllers/categoryController.js';
import { queryMiddleware } from '../middlewares/queryMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { categoryByIdSchema } from '../validateSchem/productSchems/categoreSchema.js';


const categoryRouter = express.Router();

const filterableFields = {
    productName: { type: 'text' },
    productID: { type: 'text' },
    productSize: { type: 'text' }
};

const sortableFields = [
    'name',
    'price',
    'productStock',
    'productID',
];

categoryRouter.get('/all', getProductCategories);

categoryRouter.post('/getByName',
    validateRequest(categoryByIdSchema),
    queryMiddleware(filterableFields,sortableFields),
    getProductsByCategory
)


export default categoryRouter;
