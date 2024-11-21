import React, { useEffect } from 'react'
import Loader from '../layout/loader/Loading.jsx'
import MetaData from '../layout/MetaData.jsx'
import { useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
function Profile() {
  const { user, loading, isAuthenticated } = useSelector(state => state.user)
  useEffect(() => {
    if (isAuthenticated === false) {
      Navigate('/login')
    }
  }, [isAuthenticated, Navigate])
  return <>
    {loading ? <Loader /> : <>
      <MetaData title={`${user.data.name}'s profile`} />
      <div className="w-full h-[100vh]">
        <div className='mt-[10vmax]'>
          <h1 className='ml-[20vmax] text-[1.5vmax] font-poppins font-medium text-gray-500'>My Profile</h1>
          <div className='flex justify-evenly '>
            <div className='w-[20vmax]'>
              <div><img src={user.data.avatar.url} alt="User Avatar" className='w-full object-cover rounded-full duration-500 hover:scale-110' /></div>
              <Link to={'/edit/profile'}><button className='w-full my-[2vmax] duration-300 hover:bg-[#40399a] bg-[#4d46b3] px-2 py-2 text-white font-roboto text-[0.8vmax] rounded-md'>Edit Profile</button></Link>
            </div>
            <div className='font-poppins flex flex-col gap-[74px]'>
              <div>
                <h1 className='text-2xl font-medium'>Full Name</h1>
                <p className='text-[0.7vmax] font-normal text-gray-500'>{user.data.name}</p>
              </div>
              <div>
                <h1 className='text-2xl font-medium'>Email</h1>
                <p className='text-[0.7vmax] font-normal text-gray-500'>{user.data.email}</p>
              </div>
              <div>
                <h1 className='text-2xl font-medium'>Joined On</h1>
                <p className='text-[0.7vmax] font-normal text-gray-500'>{(user.data.createdAt).substr(0, 10)}</p>
              </div>
              <div className='flex flex-col w-[25vmax] gap-8'>
                <Link to={'/orders'} className='text-center w-full duration-300 hover:bg-[#40399a] bg-[#4d46b3] px-2 py-2 text-white font-roboto text-[0.8vmax] rounded-md'>My Orders</Link>
                <Link to={'/change/password'} className='text-center duration-300 hover:bg-[#40399a] w-full bg-[#4d46b3] px-2 py-2 text-white font-roboto text-[0.8vmax] rounded-md'>Change Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>}

  </>
}

export default Profile