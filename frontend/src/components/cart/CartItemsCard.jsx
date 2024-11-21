import React from "react";
import { Link } from "react-router-dom";
const CartItemsCard = ({ item, removeItemToCart }) => {
  return (
    <div className="flex p-[1vmax] h-[1vmax] items-start box-border">
      <img src={item.image} alt={item.name} className="w-[5vmax]" />
      <div className="flex py-[0.3vmax] px-[1vmax] flex-col">
        <Link to={`/product/${item.product}`} className="text-[0.9vmax] font-poppins font-light">{item.name}</Link>
        <span className="text-[0.9vmax] font-light font-poppins">{`Price: ${item.price}`}</span>
        <p onClick={() => removeItemToCart(item.product)} className="text-[tomato] cursor-pointer text-[0.8vmax] font-medium font-poppins">Remove</p>
      </div>
    </div>
  )
};

export default CartItemsCard;
