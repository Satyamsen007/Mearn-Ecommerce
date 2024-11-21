import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.jsx';
import CheckOutSteps from './CheckOutSteps.jsx';

function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user)

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const totalPrice = itemsPrice + shippingPrice;

  const handleConfirmOrder = () => {
    navigate('/payment');
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <div className="max-w-4xl mx-auto my-12 bg-white shadow-xl rounded-lg p-8">
        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Confirm Your Order</h2>

// Todo: Add Div

        {/* Confirm Order Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleConfirmOrder}
            className="w-full md:w-1/3 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;
