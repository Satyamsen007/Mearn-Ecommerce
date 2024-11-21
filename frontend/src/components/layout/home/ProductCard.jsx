import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './Home.css';

function ProductCard({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)", // Fixed: Added the closing parenthesis
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link to={`/product/${product._id}`} className="product-card w-[14vmax] flex flex-col no-underline m-20">
      <img src={product.images[0]?.url} alt={product.name} className="w-full h-[14vmax]" />
      <p className="text-[1.2vmax] font-roboto my-[1vmax] mx-[0.5vmax] mb-0 sm:text-[1.7vmax]">
        {product.name}
      </p>
      <div className="m-[0.5vmax] font-roboto font-medium text-[0.7vmax] sm:m-[0vmax] sm:block">
        <div className='flex items-center'>
          <ReactStars {...options} />
          <span className="sm:my-0 sm:mx-[0.5vmax] sm:font-roboto sm:font-medium sm:text-[1vmax]">
            ({product.numOfReviews || 0} Reviews)
          </span>
        </div>
      </div>
      <span className="m-[0.5vmax] text-[tomato] font-poppins text-[1vmax]">
        ₹{product.price}
      </span>
    </Link>
  );
}

export default ProductCard;
