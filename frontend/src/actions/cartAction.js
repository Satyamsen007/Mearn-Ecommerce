import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants.js';
import axios from 'axios';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    // Fetch product data
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.data._id,
        name: data.data.name,
        price: data.data.price,
        image: data.data.images?.[0]?.url || 'default-image-url',
        stock: data.data.stock,
        quantity,
      },
    });

    // Update localStorage
    const { cartItems } = getState().cart;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    // Optional: Dispatch an error action or show an alert to the user.
  }
};
export const removeToCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_TO_CART,
      payload: id
    });
    const { cartItems } = getState().cart;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
};

export const addShippingInfo = (info) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: info
    });
    localStorage.setItem('shippingInfo', JSON.stringify(info));
  } catch (error) {
    console.error("Error Add Shipping Info to cart:", error.message);
  }
};
