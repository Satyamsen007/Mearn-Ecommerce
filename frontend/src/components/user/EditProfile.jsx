import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR, EDIT_USER_PROFILE_RESET } from '../../constants/userConstants.js';
import { loadUser, updateUserProfile } from '../../actions/userAuthenticateAction.js';
import { toast } from 'react-toastify';
import Loader from '../layout/loader/Loading.jsx';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.jsx';
import '../authUser/LoginSignUp.css';
import { IoCamera } from "react-icons/io5";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { loading, error, isUpdated } = useSelector(state => state.profile);

  const { handleSubmit, register, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.data?.name || '',
      email: user?.data?.email || ''
    }
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.data?.avatar?.url);
  const [avatar, setAvatar] = useState(null);


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateProfileSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    // Log formData contents
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    dispatch(updateUserProfile(formData));
  };

  useEffect(() => {
    if (user?.data) {
      setValue('name', user.data.name);
      setValue('email', user.data.email);
      setAvatarPreview(user.data.avatar?.url);
    }

    if (isUpdated) {
      console.log(isUpdated);
      toast.success('Profile updated successfully');
      dispatch(loadUser());
      dispatch({ type: EDIT_USER_PROFILE_RESET });
      navigate('/account', { replace: true });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [user, isUpdated, error, navigate, dispatch, setValue]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <MetaData title={'Update Profile'} />
      {loading ? <Loader /> :
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">Update Your Profile</h2>
          <form onSubmit={handleSubmit(updateProfileSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium" htmlFor="name">Full Name</label>
              <input
                type="text"
                name='name'
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
                name='email'
                id="email"
                placeholder="Enter your email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="flex items-center gap-1 justify-evenly">
              <label htmlFor="avatar" className='relative'>
                <IoCamera className='absolute right-0 bottom-0 text-2xl' />
                {avatarPreview && <img src={avatarPreview} alt="Uploaded Avatar" className="w-[3vmax] rounded-full" />}
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200">Update Profile</button>
          </form>
        </div>
      }
    </div>
  );
}

export default EditProfile;
