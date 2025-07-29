import express from 'express';


import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';
import { createParcelSchema, updateParcelStatusSchema } from './validation';
import { validateRequest } from '../../middlewares/validation.middleware';
import { adminUpdateParcelStatus, cancelParcelHandler, confirmDeliveryHandler, createParcelHandler, getAllParcelsHandler, getMyParcels, getParcelStatusLog } from './controller';


const router = express.Router();

router.post('/', authenticateJWT, authorizeRoles('sender'), validateRequest(createParcelSchema), createParcelHandler);
router.get('/me', authenticateJWT, authorizeRoles('sender'), getMyParcels);
router.get('/incoming', authenticateJWT, authorizeRoles('receiver'), getMyParcels);

router.patch('/cancel/:id', authenticateJWT, authorizeRoles('sender'), cancelParcelHandler);
router.patch('/confirm-delivery/:id', authenticateJWT, authorizeRoles('receiver'), confirmDeliveryHandler);

router.get('/', authenticateJWT, authorizeRoles('admin'), getAllParcelsHandler);
router.patch('/status/:id', authenticateJWT, authorizeRoles('admin'), validateRequest(updateParcelStatusSchema), adminUpdateParcelStatus);

router.get('/:id/status-log', authenticateJWT, authorizeRoles('sender', 'receiver', 'admin'), getParcelStatusLog);

export const parcelRoutes = router
