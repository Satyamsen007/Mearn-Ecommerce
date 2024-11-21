import {
  ALL_PRODUCT_REQUESTS,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAILED,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUESTS,
  CLEAR_ERROR
} from '../constants/productConstants'

const productReducer = (state = { products: [], error: null }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUESTS:
      return {
        ...state,           // Keep the current state to avoid removing `error`
        loading: true,
        products: [],
        error: null,
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,           // Keep the current state to avoid removing `error`
        loading: false,
        products: action.payload.data.products,
        productsCount: action.payload.data.productsCount,
        resultPerPage: action.payload.data.resultPerPage,
        filteredProductsCount: action.payload.data.filteredProductsCount,
        error: null,
      };
    case ALL_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload   // Set the error from action payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,    // Clear the error when CLEAR_ERROR is dispatched
      };
    default:
      return state;
  }
};



const productDetailsReducer = (state = { products: {}, error: null }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUESTS:
      return {
        ...state,           // Keep the current state to avoid removing `error`
        loading: true,
        error: null,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,           // Keep the current state to avoid removing `error`
        loading: false,
        productDetails: action.payload.data,
        error: null,
      };
    case PRODUCT_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload   // Set the error from action payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,    // Clear the error when CLEAR_ERROR is dispatched
      };
    default:
      return state;
  }
};


export { productReducer, productDetailsReducer } 