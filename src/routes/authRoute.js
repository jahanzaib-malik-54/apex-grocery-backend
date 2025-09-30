import express from 'express';
import { 
    changePassword,
    forgotPassword,
    login, 
    logout, 
    refreshToken,  
    resetPassword,  
    signup 
} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { 
    changePasswordSchema,
    forgotPasswordSchema, 
    loginSchema, 
    refreshTokenSchema, 
    resetPasswordSchema, 
    signupAdminSchema, 
    signupSchema 
} from '../validateSchem/authSchem/auth.js';
import { checkAdmin } from '../middlewares/adminMiddlewares.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const authRouter = express.Router();

authRouter.post('/admin/signup',verifyToken,checkAdmin, validateRequest(signupAdminSchema), signup);
authRouter.post('/consumer/signup', validateRequest(signupSchema), signup);

authRouter.post('/consumer/login', validateRequest(loginSchema), login);
authRouter.post('/admin/login', validateRequest(loginSchema), login);
authRouter.post('/refreshToken',validateRequest(refreshTokenSchema),refreshToken)
authRouter.post('/forgotPassword',validateRequest(forgotPasswordSchema),forgotPassword)
authRouter.post("/resetPassword",validateRequest(resetPasswordSchema),resetPassword)
authRouter.post('/logout',verifyToken,logout)
authRouter.post('/changePassword',
    verifyToken,
    validateRequest(changePasswordSchema),
    changePassword
);
export default authRouter;
