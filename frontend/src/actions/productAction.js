import axios from 'axios';
import {
  ALL_PRODUCT_FAILED,
  ALL_PRODUCT_REQUESTS,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUESTS,
  PRODUCT_DETAILS_SUCCESS
} from '../constants/productConstants';

// Action to get products
export const getProduct = (keyword = '', currentPage = 1, priceRange = [0, 25000], category, rating = 0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUESTS });
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${rating}`
    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&category=${category}&ratings[gte]=${rating}`
    }
    const { data } = await axios.get(link);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAILED,
      payload: error.response?.data.message || 'Something went wrong'
    });
  }
};



export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUESTS });

    const { data } = await axios.get(`/api/v1/product/${productId}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload: error.response?.data.message || 'Something went wrong'
    });
  }
};


