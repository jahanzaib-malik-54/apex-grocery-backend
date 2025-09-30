import express from 'express';
import { deleteMyAccount, getMyUserInfo, updateMyUserInfo} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { updateUserSchema } from '../validateSchem/user/userSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const userRouter = express.Router();

userRouter.get('/getMyUserInfo', verifyToken, getMyUserInfo);
userRouter.patch('/updateMyUserInfo',verifyToken,validateRequest(updateUserSchema),updateMyUserInfo)
userRouter.delete('/deleteMyAccount',verifyToken,deleteMyAccount)
export default userRouter;
