import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productAction.js'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './ProductDetails.css'
import { ReviewCard } from './ReviewCard.jsx'
import Loader from '../../components/layout/loader/Loading.jsx'
import { toast } from 'react-toastify'
import { CLEAR_ERROR } from '../../constants/productConstants.js'
import { addToCart } from '../../actions/cartAction.js'
function ProductDetails() {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const { id } = useParams()
  const { productDetails, loading, error } = useSelector(state => state.productDetails);
  const { cartItems } = useSelector(state => state.cart);

  const increaseQuantity = () => {
    if (productDetails.stock <= quantity) return
    setQuantity((prev) => prev + 1)
  }
  const decreaseQuantity = () => {
    if (quantity <= 1) return
    setQuantity((prev) => prev - 1)
  }
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)", // Fixed: Added the closing parenthesis
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: productDetails.ratings,
    isHalf: true,
  };
  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity))
    toast.success('Product added to cart');
  }
  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR })
    }
  }, [error])

  return (
    <>
      {loading ? <Loader /> :
        <>
          <div className='w-[100vw] max-w-full flex p-[8vmax] box-border bg-white productDetails'>
            <div className='w-full flex flex-col justify-evenly p-[2vmax] box-border border-2 border-solid border-white'>
              <Carousel>
                {productDetails.images && productDetails.images.map((item, index) => (
                  <img src={item.url} key={index} alt={`${index} Slide`} className='w-full h-[55vmin]' />
                ))}
              </Carousel>
            </div>
            <div className='w-full flex flex-col justify-evenly items-start p-[2vmax] box-border border-2 border-solid border-white'>
              <div className='border-b border-solid border-b-[#6c757d] w-full'>
                <h2 className='text-[2vmax] text-[#2f3e46] font-semibold'>{productDetails.name}</h2>
                <p className='text-[#6c757d] font-medium'>Product #{productDetails._id}</p>
              </div>
              <div className='flex items-center gap-2 text-[#6c757d] font-medium mt-5'>
                <ReactStars {...options} />
                <span>({productDetails.numOfReviews} Reviews)</span>
              </div>
              <div className='border-t border-solid border-t-[#6c757d] w-full'>
                <h1 className='text-[2vmax] text-[#2f3e46] font-bold my-3 '>₹{productDetails.price}</h1>
                <div className='flex items-center gap-4'>
                  <div>
                    <button onClick={decreaseQuantity} className='bg-[#364958] text-white p-[0.5vmax] border-none cursor-pointer duration-[0.5s] hover:bg-[#20323f]'>-</button>
                    <input type='number' readOnly value={quantity} className='text-center outline-none w-[2vmax] p-[0.5vmax] text-[rgba(0,0,0,0.74)] caret-transparent' />
                    <button onClick={increaseQuantity} className='bg-[#364958] text-white p-[0.5vmax] border-none cursor-pointer duration-[0.5s] hover:bg-[#20323f]'>+</button>
                  </div>
                  <button onClick={addToCartHandler} className='border-none bg-[tomato] py-[0.5vmax] px-[2vmax] text-white text-[15px] font-poppins font-medium cursor-pointer rounded-[20px] outline-none duration-[0.5s] hover:bg-[#f35b04]'>Add to Cart</button>
                </div>
                <p className='border-y border-solid border-y-[rgba(0,0,0,0.205)] py-[1vmax] text-[rgba(0,0,0,0.651)] my-[1vmax] text-[1vmax] font-normal font-roboto'>Status: <b className={`${productDetails.stock < 1 ? 'text-red-600' : 'text-green-600'}`}>
                  {productDetails.stock < 1 ? "OutOfStock" : "InStock"}
                </b></p>
              </div>
              <div className='text-[#212529] font-semibold text-[1.5vmax] font-sans'>
                Description:
                <p className='text-[0.8vmax] text-[#495057] font-normal'>{productDetails.description}</p>
              </div>
              <button className='bg-[tomato] py-[0.5vmax] px-[2vmax] text-white font-poppins rounded-[20px] text-[15px] duration-[0.5s] hover:bg-[#f35b04] hover:scale-110 cursor-pointer my-5'>Submit Review</button>
            </div>
          </div>
          <h3 className='m-auto text-center text-[1.4vmax] font-medium text-[#000000be] mb-[4vmax] p-[1vmax] font-poppins border-b border-solid border-b-[rgba(0,0,0,0.226)] w-[20vmax]'>Reviews</h3>
          {productDetails.reviews && productDetails.reviews[0] ? (
            <div className='flex p-[2vmax] items-center justify-evenly flex-wrap'>
              {productDetails.reviews && productDetails.reviews.map((review) => <ReviewCard key={review} review={review} />)}
            </div>
          ) : <p className='text-center font-serif text-[1.5vmax] mb-[2vmax]'>No Reviews Yet</p>}
        </>
      }
    </>
  )
}

export default ProductDetails