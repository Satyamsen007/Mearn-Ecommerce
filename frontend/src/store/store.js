import { createStore, combineReducers, applyMiddleware } from 'redux'
import { productReducer, productDetailsReducer } from '../reducers/productReducer.js';
import { thunk } from 'redux-thunk'
import { forgotPassReducer, profileReducer, userReducer } from '../reducers/userReducer.js';
import { cartReducer } from '../reducers/cartReducer.js'
const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPass: forgotPassReducer,
  cart: cartReducer
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
  },
}

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;