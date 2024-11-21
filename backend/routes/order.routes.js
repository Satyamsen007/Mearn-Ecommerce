import express from 'express';
import { isAuthenticateUser, authorizeRole } from '../middlewares/authUser.js'
import { deleteOrder, getAllOrders, getMyOrders, getSingleOrder, newOrder, updateOrderStatus } from '../controllers/order.controller.js';
const router = express.Router();

router.route('/order/create').post(isAuthenticateUser, newOrder)
router.route('/order/:id').get(isAuthenticateUser, getSingleOrder).patch(isAuthenticateUser, authorizeRole("admin"), updateOrderStatus).delete(isAuthenticateUser, authorizeRole("admin"), deleteOrder)
router.route('/myorders').get(isAuthenticateUser, getMyOrders)
router.route('/orders/all').get(isAuthenticateUser, authorizeRole("admin"), getAllOrders)
export default router;