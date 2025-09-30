import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addToCart, clearCart, getAllCart, removeFromCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add/:id',verifyToken,addToCart)
cartRouter.get('/all',verifyToken,getAllCart)
cartRouter.delete("/removeBYId/:id",verifyToken,removeFromCart)
cartRouter.delete("/deleteAll",verifyToken,clearCart)

export default cartRouter;
