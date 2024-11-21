import { RemoveShoppingCart } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      {/* Cart Icon */}
      <div className="text-gray-400 mb-6">
        <RemoveShoppingCart sx={{ width: 100, height: 100 }} />
      </div>

      {/* Message */}
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Your Cart is Empty</h1>
      <p className="text-gray-500 text-center mb-6">
        Looks like you haven’t added anything to your cart yet.
      </p>

      {/* Button */}
      <Link to={'/products'} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
        Shop Now
      </Link>
    </div>
  );
};

export default EmptyCart