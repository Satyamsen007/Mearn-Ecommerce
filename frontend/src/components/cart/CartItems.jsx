import React from 'react'
import CartItemsCard from '../cart/CartItemsCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeToCart } from '../../actions/cartAction.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import MetaData from '../layout/MetaData.jsx'
import { useNavigate } from 'react-router-dom'
function CartItems() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const increaseQuantity = (id, quantity, stock) => {
    let newQut = quantity + 1;
    if (stock <= quantity) return
    dispatch(addToCart(id, newQut))
  }
  const decreaseQuantity = (id, quantity) => {
    let newQut = quantity - 1;
    if (quantity <= 1) return
    dispatch(addToCart(id, newQut))
  }
  const removeItemToCart = (id) => {
    dispatch(removeToCart(id))
  }
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }
  return (
    <>
      <MetaData title={'Cart'} />
      {cartItems.length === 0 ? <EmptyCart /> : <div className='p-[5vmax]'>
        <div className='bg-[tomato] w-[90%] box-border m-auto text-white grid grid-cols-[4fr_1fr_1fr] font-roboto font-light text-[0.7vmax]'>
          <p className='m-[10px]'>Product</p>
          <p className='m-[10px]'>Quantity</p>
          <p className='m-[10px] text-end'>SubTotal</p>
        </div>

        {cartItems.map((item) => (<div key={item.product} className='w-[90%] m-auto grid grid-cols-[4fr_1fr_1fr]'>
          <CartItemsCard item={item} removeItemToCart={removeItemToCart}></CartItemsCard>
          <div className='flex h-[8vmax] items-center'>
            <button onClick={() => decreaseQuantity(item.product, item.quantity)} className='border-none bg-[rgba(0,0,0,0.616)] p-[0.5vmax] cursor-pointer duration-[0.5s] text-white hover:bg-[rgba(0,0,0,0.767)]'>-</button>
            <input type="number" readOnly value={item.quantity} className='outline-none text-center w-[2vmax] font-poppins font-medium text-[0.8vmax] text-[rgba(0,0,0,0.74)] p-[0.5vmax]' />
            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} className='border-none bg-[rgba(0,0,0,0.616)] p-[0.5vmax] cursor-pointer duration-[0.5s] text-white hover:bg-[rgba(0,0,0,0.767)]'>+</button>
          </div>
          <p className='flex justify-end p-[0.5vmax] text-[1vmax] font-cursive font-medium text-[rgba(0,0,0,0.753)] items-center box-border'>{`₹${item.price * item.quantity}`}</p>
        </div>))}

        <div className='grid grid-cols-[2fr_1.2fr]'>
          <div></div>
          <div className='border-t-[3px] border-solid border-[tomato] box-border mt-[1vmax] mx-[4vmax] flex justify-between pt-[2vmax] font-normal font-roboto text-[1vmax]'>
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce((accu, curr) => accu + curr.quantity * curr.price, 0)}`}</p>
          </div>
          <div></div>
          <div className='flex justify-end'>
            <button onClick={checkoutHandler} className='bg-[tomato] text-white py-[0.8vmax] px-[4vmax] my-[2vmax] mx-[4vmax] cursor-pointer rounded-[30px] text-[0.8vmax] font-normal font-poppins w-1/2'>Check Out</button>
          </div>
        </div>
      </div>}
    </>
  )
}

export default CartItems