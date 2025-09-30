import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { checkAdmin } from '../middlewares/adminMiddlewares.js';
import { getUserById, getUsersList, updateUserById, updateUserStatus } from '../controllers/adminController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import updateStatusSchema from '../validateSchem/common/updateStatusSchema.js';
import { userStatus } from '../utils/queryUtils.js';
import allowedRoles from '../utils/role.js';
import queryMiddleware from '../middlewares/queryMiddleware.js'
import { updateUserInfoSchema } from '../validateSchem/user/userSchema.js';
const adminRouter = express.Router();
export const validSortFieldUser = ['name', 'email', 'createdAt', 'updatedAt'];


const filterableFields = {
    name: { type: 'text' },
    role: { type: 'text', options: allowedRoles },
    status: { type: 'text', options: userStatus },
    email: { type: 'text' },
};

const sortableFields = ['name', 'email'];

adminRouter.get(
    '/getUsersList',
    verifyToken,
    checkAdmin,
    queryMiddleware(filterableFields,sortableFields),
    getUsersList
);
adminRouter.get('/:id', verifyToken, checkAdmin, getUserById);
adminRouter.post (
    '/updateUserStatus/:id',
    verifyToken,
    checkAdmin,
    validateRequest(updateStatusSchema),
    updateUserStatus)

    adminRouter.patch('/updateUserById/:id',
        verifyToken,
        checkAdmin,
        validateRequest(updateUserInfoSchema),
        updateUserById)

export default adminRouter;
