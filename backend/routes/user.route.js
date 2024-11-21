import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUserProfile
} from '../controllers/user.controller.js';

import { isAuthenticateUser } from '../middlewares/authUser.js'
import { authorizeRole } from '../middlewares/authUser.js';
import { upload } from '../middlewares/multer.js'
const router = express.Router();

router.route('/register').post(upload.single('avatar'), registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(isAuthenticateUser, logoutUser);
router.route('/user/details').get(isAuthenticateUser, getUserDetails)
router.route('/update/password').patch(isAuthenticateUser, updateUserPassword)
router.route('/update/user').patch(isAuthenticateUser, upload.single('avatar'), updateUserDetails)
router.route('/admin/users').get(isAuthenticateUser, authorizeRole("admin"), getAllUsers)

router.route('/admin/user/:id')
  .get(isAuthenticateUser, authorizeRole("admin"), getUser)
  .patch(isAuthenticateUser, authorizeRole('admin'), updateUserRole)
  .delete(isAuthenticateUser, authorizeRole('admin'), deleteUserProfile)


export default router;