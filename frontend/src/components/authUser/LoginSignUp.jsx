import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR } from '../../constants/userConstants.js';
import { loginUser, registerUser } from '../../actions/userAuthenticateAction.js';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import Loader from '../layout/loader/Loading.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignUp.css'
function LoginSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(state => state.user);

  const [authenticationTab, setAuthenticationTab] = useState('login');
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [avatarPreview, setAvatarPreview] = useState('/profile.png');

  const loginSubmit = (data) => {
    dispatch(loginUser(data.email, data.password));
    toast.success('User logged in successfully')
  };

  const registerSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    const avatarFile = data.avatar[0];
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    // Send the formData to the backend
    dispatch(registerUser(formData));
  };
  const redirect = location.search ? location.search.split('=')[1] : 'account'
  console.log(redirect);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error, isAuthenticated, navigate, dispatch, redirect]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {loading ? <Loader /> : (
        <>
          {authenticationTab === 'login' ? (
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>

              <form onSubmit={handleSubmit(loginSubmit)} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                    className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                    className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="px-8 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Login
                  </button>
                  <Link to={'/forgot/password'}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="text-sm text-center text-gray-600">
                  Don’t have an account?{' '}
                  <button onClick={() => setAuthenticationTab('signup')} className="text-blue-500 hover:underline">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
              <form onSubmit={handleSubmit(registerSubmit)} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    {...register('name', { required: 'Full Name is required' })}
                    className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Create a password"
                    {...register('password', { required: 'Password is required' })}
                    className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <div className='flex items-center gap-1 justify-evenly'>
                  <label htmlFor="avatar">
                    {avatarPreview && <img src={avatarPreview} alt="Uploaded Avatar" className="w-[3vmax] rounded-full" />}
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    {...register('avatar', { required: 'Avatar is required' })}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = () => setAvatarPreview(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>

                <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200">Sign Up</button>
                <div className="text-sm text-center text-gray-600">
                  Already have an account?{' '}
                  <button onClick={() => setAuthenticationTab('login')} className="text-blue-500 hover:underline">Log in</button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LoginSignUp;
