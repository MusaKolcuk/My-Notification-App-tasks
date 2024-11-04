import express from 'express';
import { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder, getNotifications } from '../controllers/orderController.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:orderId', getOrder);
router.put('/update/:orderId', updateOrder);
router.delete('/delete/:orderId', deleteOrder);
router.get('/notifications', authenticateUser, getNotifications);

export default router;
