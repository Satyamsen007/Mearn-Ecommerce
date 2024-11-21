import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants.js';

const initialState = {
  cartItems: [],
  shippingInfo:{},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      // Check if the item exists in the cart
      const existingItem = state.cartItems.find((i) => i.product === item.product);

      if (existingItem) {
        // Update the existing item's details
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existingItem.product ? item : i
          ),
        };
      } else {
        // Add a new item to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload)
      }

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      }
    default:
      return state;
  }
};

export { cartReducer };
