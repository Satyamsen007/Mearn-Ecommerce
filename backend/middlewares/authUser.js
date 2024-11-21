import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
const isAuthenticateUser = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return next(new ApiError('Please login to access this resource.', 401));
  }
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE_KEY);
  req.user = await User.findOne({ email: decodedToken.email });
  next()
});

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(`Role: ${req.user.role} is not allowed to access this resource`, 403))
    }

    next();
  }
}


export { isAuthenticateUser, authorizeRole }