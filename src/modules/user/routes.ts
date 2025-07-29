import express from 'express';

import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';
import { getUsers, updateUser } from './controller';
import { validateRequest } from '../../middlewares/validation.middleware';
import { updateUserSchema } from './validation';


const router = express.Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getUsers);
router.patch('/:id', authenticateJWT, authorizeRoles('admin'), validateRequest(updateUserSchema), updateUser);

export const userRoutes = router
