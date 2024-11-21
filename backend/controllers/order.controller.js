import { Order } from "../models/order.model.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponce } from '../utils/ApiResponce.js';
import { ApiError } from '../utils/ApiError.js';
import { Product } from '../models/product.model.js'

//update Product Stock 
const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);

  product.stock -= Number(quantity);
  await product.save({ validateBeforeSave: false })
}

//Create a new Order
const newOrder = asyncHandler(async (req, res) => {
  const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  const order = await Order.create({
    user: req.user._id,
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now()
  });

  return res.status(201).json(
    new ApiResponce(201, order, 'Order Created successfully')
  )
});

//get a single order
const getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    return next(new ApiError('Order not found', 404));
  }
  return res.status(200).json(
    new ApiResponce(200, order, 'Order Fetched Successfully')
  )
})

//get logged-in user's order's
const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new ApiError('No orders found', 404));
  }
  return res.status(200).json(
    new ApiResponce(200, { orders, ordersCount: orders.length }, 'Orders Feched Successfully')
  )
})

//get all orders ----(admin)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  let totalAmount = 0
  orders.forEach((order) => {
    totalAmount += order.totalPrice
  });
  return res.status(200).json(
    new ApiResponce(200, { totalAmount, orders }, 'All Orders Feched Successfully')
  )
});


//update Order status ---(Admin)
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError('Order not found for this id:' + req.params.id, 404))
  }
  if (!['processing', 'delivered', 'cancelled'].includes(req.body.status)) {
    return next(new ApiError('Status is not a valid status', 404))
  }
  if (order.orderStatus === 'delivered') {
    return next(new ApiError('You have already delivered this order', 400))
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity)
  })

  order.orderStatus = req.body.status;
  if (req.body.status === 'delivered') {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false })
  return res.status(200).json(
    new ApiResponce(200, order, 'Order status updated successfully')
  )
});

//Delete order
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError('Order not found for this id:' + req.params.id, 404))
  }
  await Order.deleteOne(order._id)
  return res.status(200).json(
    new ApiResponce(200, {}, 'Order deleted successfully')
  )
})
export {
  newOrder,
  getSingleOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
}