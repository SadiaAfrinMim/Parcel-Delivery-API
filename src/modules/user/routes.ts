import express from 'express';
import { getUsers, updateUser } from './user.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { updateUserSchema } from './user.validation';

const router = express.Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getUsers);
router.patch('/:id', authenticateJWT, authorizeRoles('admin'), validateRequest(updateUserSchema), updateUser);

export default router;
