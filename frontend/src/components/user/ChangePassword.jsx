import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR, CHANGE_PASSWORD_RESET } from '../../constants/userConstants.js';
import { loadUser, changeUserPassword } from '../../actions/userAuthenticateAction.js';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import Loader from '../layout/loader/Loading.jsx';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector(state => state.profile);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChangePassword = (data) => {
    dispatch(changeUserPassword(data));
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success('Password updated successfully');
      dispatch(loadUser());
      dispatch({ type: CHANGE_PASSWORD_RESET });
      navigate('/account');
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [isUpdated, error, navigate, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 md:p-8">
      <MetaData title={'Change Password'} />
      {loading && !error ? (
        <Loader />
      ) : (
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-6 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Update Your Password</h2>

          <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium" htmlFor="oldPassword">Old Password</label>
              <input
                type={showOldPassword ? 'text' : 'password'}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter your old password"
                {...register('oldPassword', { required: 'Old password is required' })}
                className="w-full px-4 pr-10 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.oldPassword && <p className="mt-1 text-sm text-red-500">{errors.oldPassword.message}</p>}
              <span
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer ${errors.oldPassword ? 'text-red-500' : 'text-gray-600 translate-y-1/4'
                  }`}
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium" htmlFor="newPassword">New Password</label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                id="newPassword"
                placeholder="Enter your new password"
                {...register('newPassword', { required: 'New password is required' })}
                className="w-full px-4 pr-10 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>}
              <span
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer ${errors.newPassword ? 'text-red-500' : 'text-gray-600 translate-y-1/4'
                  }`}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
            >
              Change Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;