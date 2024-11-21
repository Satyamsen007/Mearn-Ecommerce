import React, { useEffect } from 'react'
import { CgMouse, CgProfile } from 'react-icons/cg'
import './Home.css'
import Product from './ProductCard.jsx'
import { IoSearch } from 'react-icons/io5'
import { FaCartPlus } from 'react-icons/fa6'
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../../images/logo.png";
import MetaData from '../MetaData.jsx'
import { getProduct } from '../../../actions/productAction.js'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../loader/Loading.jsx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CLEAR_ERROR } from '../../../constants/productConstants.js'

function Home() {

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(state => state.products);
  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // Handle errors when they occur
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR }); // Clear the error after displaying it
    }
  }, [error, dispatch]); // Only runs when error changes



  return (
    <>
      {loading ? <Loading /> : <>
        <MetaData title={"Ecommerce"} />
        <div className='banner relative bg-gradient-to-r from-[#635dc0] to-[#3027ae] h-[100vmin] text-center flex items-center justify-center flex-col text-white'>
          <div className='max600:flex max600:w-full max600:justify-between max600:px-8 lg:hidden md:hidden sm:hidden max600:visible max600:absolute max600:top-[-20px]'>
            <div className='max600:flex max600:gap-3 max600:items-center'>
              <div className='max600:text-[26px] max600:hover:text-[#6A9AB0] max600:transition duration-200'>
                <GiHamburgerMenu />
              </div>
              <div className="max600:w-64">
                <img src={logo} alt="Logo" />
              </div>
            </div>
            <div className="max600:flex max600:items-center max600:gap-8 max600:text-[26px]">
              <IoSearch className="hover:text-[#6A9AB0] transition duration-200" />
              <CgProfile className="hover:text-[#6A9AB0]  transition duration-200" />
              <FaCartPlus className="hover:text-[#6A9AB0]  transition duration-200" />
            </div>
          </div>
          <p className='font-medium text-[1.4vmax] font-garamond'>Welcome To Ecommerce.</p>
          <h1 className='m-[5vmax] font-semibold font-roboto text-[2.5vmax] uppercase'>Find Amazing Products Below</h1>
          <a href='#featured-product'>
            <button className='mb-[5vmax] p-[1vmax] bg-white border border-solid border-white text-black transition-all duration-[0.5s] w-[9vmax] font-medium text-[1vmax] font-roboto flex items-center justify-center gap-2 rounded-md hover:bg-transparent hover:text-white'>
              Scroll <CgMouse />
            </button>
          </a>
        </div>

        <h1 id='featured-product' className='text-center font-roboto text-[1.4vmax] border-b border-b-[#384B70] w-[20vmax] my-[5vmax] mx-auto'>Featured Product</h1>

        <div className='flex flex-wrap justify-center'>
          {products && products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </>}
    </>
  )
}

export default Home