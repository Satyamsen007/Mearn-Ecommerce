import { Product } from "../models/product.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponce.js'
import { ApiFeatures } from "../utils/apiFeatures.js";
//Create Products
const createNewProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, category, images } = req.body;
  if (!(name && description && price && category)) {
    return next(new ApiError('Please fill the required field', 400))
  }
  const localImageFeild = req.file?.path;


  const product = await Product.create({
    name,
    description,
    price,
    category,
    images,
    owner: req.user?.id
  });
  res.status(200).json(
    new ApiResponce(200, product, 'Product created successfully')
  )
})

//Get All Products
const getAllProducts = asyncHandler(async (req, res, next) => {
  const resultPerPage = 9;
  const productsCount = await Product.countDocuments();

  // Create ApiFeatures instance and apply search and filter
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();

  // Get filtered product count without pagination
  const unpaginatedProducts = await apiFeature.query.clone(); // Use clone() to avoid modifying the original query
  const filteredProductsCount = unpaginatedProducts.length;

  // Now apply pagination
  apiFeature.pagination(resultPerPage);
  const paginatedProducts = await apiFeature.query;

  // Check if products exist after filtering and pagination
  if (paginatedProducts.length === 0) {
    return next(new ApiError('No Product found', 400));
  }

  // Respond with data
  res.status(200).json(
    new ApiResponce(
      200,
      { products: paginatedProducts, productsCount, resultPerPage, filteredProductsCount },
      'Products fetched successfully'
    )
  );
});


//Update Product
const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const { name, description, price, category } = req.body;
  if (!product) {
    return next(new ApiError('No Product found', 400));
  }
  const updatedProduct = await Product.findByIdAndUpdate(product._id, { $set: { name, description, price, category } }, { new: true });
  return res.status(200).json(
    new ApiResponce(200, updatedProduct, 'Product updated successfully')
  )
});

//Delete Product
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ApiError('No Product found', 400));
  }
  return res.status(200).json(
    new ApiResponce(200, null, 'Product deleted successfully')
  )
});

//Get SingaleProduct
const getProductDetails = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next(new ApiError('No Product found', 400));
  }
  return res.status(200).json(
    new ApiResponce(200, product, 'Product details fetched successfully')
  )
});

//Create a new review or update the review
const createAndUpdateReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ApiError('No Product found', 400));
  }
  const reviews = {
    user: req.user.id,
    name: req.user.name,
    rating,
    comment
  }
  const existingReviews = product.reviews.find(rev => rev.user.toString() === req.user.id.toString())

  if (existingReviews) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.comment = comment;
        rev.rating = Number(rating)
      }
    })
  } else {
    product.reviews.push(reviews);
    product.numOfReviews = product.reviews.length;
  }

  let avr = 0;
  product.reviews.forEach(rev => avr += Number(rev.rating));
  product.ratings = avr / product.numOfReviews;
  await product.save({ validateBeforeSave: false });
  return res.status(200).json(
    new ApiResponce(200, product, 'Reviews added successfully')
  )
});

//Get All reviews
const getAllReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ApiError('No Product found', 400));
  }
  res.status(200).json(
    new ApiResponce(200, product.reviews, 'All reviews Fetched successfully')
  )
});

//delete review
const deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ApiError(400, 'No Product found'));
  }
  const reviews = product.reviews.filter((rev) => rev.user.toString() !== req.query.id.toString());
  const numOfReviews = reviews.length;
  let avr = 0;
  reviews.forEach(rev => avr += Number(rev.rating));
  const ratings = avr / numOfReviews;
  await Product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews }, { new: true, runValidators: true })
  return res.status(200).json(
    new ApiResponce(200, {}, 'Review deleted successfully')
  )
})



export { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProductDetails, createAndUpdateReview, getAllReviews, deleteReview }