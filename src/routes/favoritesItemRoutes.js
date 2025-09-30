import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addToFavorites, clearAllFavorites, getAllFavorites, removeFromFavorites } from '../controllers/favoritesController.js';

const favoritesProductRouter = express.Router();

favoritesProductRouter.post('/add/:id',verifyToken,addToFavorites)
favoritesProductRouter.delete("/remove/:id",verifyToken,removeFromFavorites)
favoritesProductRouter.get('/all',verifyToken,getAllFavorites)
favoritesProductRouter.delete("/deleteAll",verifyToken,clearAllFavorites)

export default favoritesProductRouter;
