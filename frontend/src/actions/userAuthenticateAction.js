import axios from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOAD_USER_FAILED,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  EDIT_USER_PROFILE_FAILED,
  EDIT_USER_PROFILE_REQUEST,
  EDIT_USER_PROFILE_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../constants/userConstants.js'

//Load user if user is authenticated
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const { data } = await axios.get('/api/v1/user/details')
    dispatch({ type: LOAD_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: LOAD_USER_FAILED, payload: error.response.data.message })
  }

}

//Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/v1/login', { email, password }, config)
    dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    dispatch(loadUser())
  } catch (error) {
    dispatch({ type: LOGIN_FAILED, payload: error.response.data.message })
  }

}

//Register User
export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST })
    const config = {
      headers: {

      }
    }
    console.log(formData);

    const { data } = await axios.post('/api/v1/register', formData, config)
    dispatch({ type: REGISTER_SUCCESS, payload: data.user })
    dispatch(loadUser())
  } catch (error) {
    dispatch({ type: REGISTER_FAILED, payload: error.response.data.message })
  }

}

//Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get('/api/v1/logout')
    dispatch({ type: LOGOUT_USER_SUCCESS })
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAILED, payload: error.response.data.message })
  }
}

//Update User profile
export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_USER_PROFILE_REQUEST })
    const config = {
      headers: { 'content-type': "multipart/form-data" }
    }
    const { data } = await axios.patch('/api/v1/update/user', formData, config)
    dispatch({ type: EDIT_USER_PROFILE_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({ type: EDIT_USER_PROFILE_FAILED, payload: error.response.data.message })
  }
}

export const changeUserPassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST })
    const config = {
      headers: { 'content-type': "application/json" }
    }
    const { data } = await axios.patch('/api/v1/update/password', passwords, config)
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD_FAILED, payload: error.response.data.message })
  }
}

export const forgotUserPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })
    const config = {
      headers: { 'content-type': "application/json" }
    }
    const { data } = await axios.post('/api/v1/password/forgot', { email }, config)
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILED, payload: error.response.data.message })
  }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = {
      headers: { 'content-type': "application/json" }
    }
    console.log(token, passwords);
    const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)
    console.log(data);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success })
  } catch (error) {    
    dispatch({ type: RESET_PASSWORD_FAILED, payload: error.response.data.message })
  }
}