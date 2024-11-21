import express from "express";
import { upload } from '../middlewares/multer.js'
import {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createAndUpdateReview,
  getAllReviews,
  deleteReview
}
  from "../controllers/products.controller.js";
import { isAuthenticateUser, authorizeRole } from '../middlewares/authUser.js'
const router = express.Router();

// GET /api/products
router
  .route('/admin/create-product')
  .post(upload.single('image'), isAuthenticateUser, createNewProduct)


router
  .route('/products')
  .get(getAllProducts)


router
  .route('/admin/product/:id')
  .patch(isAuthenticateUser, updateProduct)
  .delete(isAuthenticateUser, deleteProduct)

router
  .route('/product/:id')
  .get(getProductDetails)


router
  .route('/product/reviews/:id').post(isAuthenticateUser, createAndUpdateReview)

router
  .route('/reviews').get(getAllReviews).delete(isAuthenticateUser, deleteReview)
export default router;