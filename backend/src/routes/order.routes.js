import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAdminOrders,
  updateOrderStatus,
  scanOrder
} from '../controllers/order.controller.js';
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getMyOrders);
router.get('/admin', protect, authorizeRoles('admin'), getAdminOrders);
router.post('/scan-order', protect, authorizeRoles('admin', 'canteen'), scanOrder);
router.patch('/:id/status', protect, authorizeRoles('admin', 'canteen'), updateOrderStatus);

export default router;
