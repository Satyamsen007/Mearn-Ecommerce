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
  LOGOUT_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  EDIT_USER_PROFILE_FAILED,
  EDIT_USER_PROFILE_REQUEST,
  EDIT_USER_PROFILE_SUCCESS,
  EDIT_USER_PROFILE_RESET,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_RESET,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  CLEAR_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../constants/userConstants.js'
const userReducer = (state = { user: {}, error: null }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      }
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isAuthenticated: false,
      };
    case LOAD_USER_FAILED:
    case LOGOUT_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
        user: null,
        isAuthenticated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,    // Clear the error when CLEAR_ERROR is dispatched
      };
    default:
      return state;
  }
}

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_USER_PROFILE_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_USER_PROFILE_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
        error: null
      };
    case EDIT_USER_PROFILE_RESET:
    case CHANGE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false
      }
    case EDIT_USER_PROFILE_FAILED:
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,    // Clear the error when CLEAR_ERROR is dispatched
      };
    default:
      return state;
  }
}

const forgotPassReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null
      };
    case FORGOT_PASSWORD_FAILED:
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
export { userReducer, profileReducer, forgotPassReducer }
