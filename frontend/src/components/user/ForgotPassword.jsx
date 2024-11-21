import { AiOutlineMail } from "react-icons/ai";
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { forgotUserPassword } from "../../actions/userAuthenticateAction";
import Loader from "../layout/loader/Loading";
import { toast } from "react-toastify";
import { CLEAR_ERROR } from "../../constants/userConstants";
function ForgotPassword() {
  const dispatch = useDispatch()
  const { loading, error, message } = useSelector(state => state.forgotPass)
  const { handleSubmit, register, formState: { errors } } = useForm()
  const forgoPassHandler = (data) => {
    dispatch(forgotUserPassword(data.email))
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERROR })
    }
    if (message) {
      toast.success(message)
    }
  }, [dispatch, error, message,])
  return (
    <>
      {loading ? <Loader /> : <>
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
            <div className='w-full h-[1px] bg-[#d8d9dc]'></div>
            <form onSubmit={handleSubmit(forgoPassHandler)} className="space-y-4">
              <div className='my-10 flex relative'>
                <span className='absolute left-1 text-xl top-4'><AiOutlineMail /></span>
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
                  className={`w-full px-9 py-2 mt-1 text-gray-900 bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-tr-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-8 py-2 w-full bg-[#F55F4A] text-white rounded hover:bg-[#c14636] transition duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </>}
    </>
  )
}

export default ForgotPassword