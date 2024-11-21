import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponce.js'
import { User } from "../models/user.model.js";
import { sendForgotPasswordEmail } from "../utils/sendEmail.js";
import crypto from 'crypto'
import { uploadCludnary } from '../utils/UploadCloudnary.js'
import { v2 as cloudinary } from 'cloudinary';
// Generate a access and refresh token. And save the refresh token in the user's refresh token feild from the database.
const generateAccessAndRefreshToken = async (userId, next) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(new ApiError('Invalid User', 401));
    }
    const access_token = user.generateAccessToken();
    const refresh_token = user.generateRefreshToken();
    user.refreshToken = refresh_token;
    await user.save();
    return { access_token, refresh_token }
  } catch (error) {
    return next(new ApiError('Error generating tokens', 500));
  }
}

// Register a new user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return next(new ApiError('Please fill all required fields', 400))
  }
  const localFilePath = req.file?.path;
  if (!localFilePath) {
    return next(new ApiError('LocalFilePath is Missing', 404))
  }
  const avatar = await uploadCludnary(localFilePath)
  if (!avatar) {
    return next(new ApiError('Avatar is Required', 404))
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError('User already exists', 400));
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      publicId: avatar.public_id,
      url: avatar.secure_url,
    }
  });
  const { access_token, refresh_token } = await generateAccessAndRefreshToken(user._id, next)
  res.status(201)
    .cookie('accessToken', access_token)
    .cookie('refreshToken', refresh_token)
    .json(
      new ApiResponce(201, { user: user, accesstoken: access_token, refreshtoken: refresh_token }, 'User Registered successfully')
    )
});

// Login a user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return next(new ApiError('Please fill all required fields', 400))
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ApiError('Incorrect email or password', 400))
  }
  const passwordIsCorrect = await user.isPasswordCorrect(password)
  if (!passwordIsCorrect) {
    return next(new ApiError('Incorrect email or password', 401))
  }
  const { access_token, refresh_token } = await generateAccessAndRefreshToken(user._id, next);
  const accessTokenOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRY_DATE * 24 * 60 * 60 * 1000), // Assuming ACCESS_TOKEN_EXPIRY_DATE is in days
  };

  const refreshTokenOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRY_DATE * 24 * 60 * 60 * 1000), // Assuming REFRESH_TOKEN_EXPIRY_DATE is in days
  };


  return res.status(200)
    .cookie('accessToken', access_token, accessTokenOptions)
    .cookie('refreshToken', refresh_token, refreshTokenOptions)
    .json(
      new ApiResponce(200, { user: user, accesstoken: access_token, refreshtoken: refresh_token }, 'User Logged in successfully')
    )

});

//Logout a User
const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

  const accessTokenOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRY_DATE * 24 * 60 * 60 * 1000), // Assuming ACCESS_TOKEN_EXPIRY_DATE is in days
  };

  const refreshTokenOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRY_DATE * 24 * 60 * 60 * 1000), // Assuming REFRESH_TOKEN_EXPIRY_DATE is in days
  };

  res.status(200)
    .clearCookie('accessToken', accessTokenOptions)
    .clearCookie('refreshToken', refreshTokenOptions)
    .json(new ApiResponce(200, {}, 'User Logout Successfully'));
});

// Forget a Password
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  // Send the forgot password email
  try {
    await sendForgotPasswordEmail(user, req);
    res.status(200).json({ message: `Reset email sent to ${email} successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error sending reset email ${error.message}` });
  }
};

// Reset a Password
const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({ resetPasswordToken }).select('+password');

  if (!user) {
    return next(new ApiError('Reset Password Token is invalid or expired', 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ApiError('Passwords do not match', 400));
  }
  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;
  await user.save();

  return res.status(200).json(
    new ApiResponce(200, user, 'Password reset successfully')
  )
};

// Get User details
const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-refreshToken');
  res.status(200).json(
    new ApiResponce(200, user, 'User Details Fached Successfully')
  )
});

// update User Password
const updateUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  const { oldPassword, newPassword } = req.body;
  const passwordIsCorrect = await user.isPasswordCorrect(oldPassword);
  if (!passwordIsCorrect) {
    return next(new ApiError('Incorrect Old Password', 401));
  }
  user.password = newPassword;
  await user.save();
  return res.status(200).json(
    new ApiResponce(200, user, 'User Password Updated Successfully')
  )
});

// update User details
const updateUserDetails = asyncHandler(async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.file) {
    const user = await User.findOne({ _id: req.user.id });

    // Only delete the existing avatar if there's a file to replace it with
    if (user?.avatar?.publicId) {
      const imageId = user.avatar.publicId;
      await cloudinary.uploader.destroy(imageId);
    }

    // Upload the new avatar to Cloudinary
    const avatar = await uploadCludnary(req.file.path);
    newUser.avatar = {
      publicId: avatar.public_id,
      url: avatar.secure_url,
    };
  }

  // Update user data
  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json(
    new ApiResponce(200, user, 'User data updated successfully')
  );
});


// getAll Users ---(Admin)
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ApiError('User not found', 404))
  }
  return res.status(200).json(
    new ApiResponce(200, users, 'All Users Feched Successfully')
  )
})

// get a single user ---(Admin)
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError(`User does exits with ID :  ${req.params.id}`, 404))
  }
  return res.status(200).json(
    new ApiResponce(200, user, 'Singal User Fached SuccesFull')
  )
});

// Update user role ---(Admin)
const updateUserRole = asyncHandler(async (req, res, next) => {
  const { role } = req.body;
  if (!await User.findOne({ _id: req.params.id })) {
    return next(new ApiError(`User does not exist with ID :  ${req.params.id}`, 404))
  }
  const user = await User.findByIdAndUpdate(req.params.id, { $set: { role } }, { new: true, runValidators: true });
  return res.status(200).json(
    new ApiResponce(200, user, 'User Role updated successfully')
  )
});

// Delete a User Profile ----(Admin)
const deleteUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError(`User does not exist with ID :  ${req.params.id}`, 404))
  }
  await User.deleteOne(user);
  return res.status(201).json(
    new ApiResponce(201, null, 'User deleted successfully')
  )
})
export { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserDetails, getAllUsers, getUser, updateUserRole, deleteUserProfile }