import React, { useState } from 'react';
import logo from "../../../images/logo.png";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileOptions from './ProfileOptions';
import { Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { cartItems } = useSelector((state) => state.cart)
  const navigate = useNavigate();
  const headerLinks = ['Home', 'Products', 'About', 'Contact'];
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
    setKeyword('');
    setShowSearchInput(false);
  };

  const toggleSearchInput = () => setShowSearchInput(!showSearchInput);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="flex z-50 h-[10vmin] w-full justify-between items-center px-5 py-4 shadow-md fixed left-0 top-0 bg-gradient-to-r from-[#635dc0] to-[#3027ae] text-white">

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-3xl text-white">
          {isMobileMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Logo */}
      <div className="w-32 md:w-64">
        <img src={logo} alt="Logo" className="w-full h-auto" />
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden lg:flex gap-10 text-lg font-roboto">
        {headerLinks.map((link, index) => (
          <Link
            key={index}
            to={`${link === 'Home' ? '/' : `/${link.toLowerCase()}`}`}
            className="relative group hover:text-[#6A9AB0] duration-200"
          >
            {link}
            <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-[#6A9AB0] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* Icons and Search Bar (Desktop) */}
      <div className="hidden lg:flex items-center text-[26px]">
        <IoSearch
          className="hover:text-[#6A9AB0] transition duration-200 cursor-pointer mt-1"
          onClick={toggleSearchInput}
        />
        <form
          onSubmit={searchSubmitHandler}
          className={` mt-1 transition-all duration-500 ease-in-out ml-2 font-poppins flex overflow-hidden ${showSearchInput ? 'w-[15vmax] opacity-100' : 'w-0 opacity-0'
            }`}
        >
          <input
            type="text"
            placeholder="Search Product...."
            value={keyword}
            className="p-2 border border-gray-300 rounded-s-[6px] outline-none shadow-md text-black text-[14px] w-full"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type='submit' value="Search" className="text-[14px] p-2 bg-orange-600 rounded-e-[6px]" />
        </form>
        {isAuthenticated && user ? (
          <ProfileOptions user={user} />
        ) : (
          <Link to="/login">
            <CgProfile className="hover:text-[#6A9AB0] transition duration-200 ml-[16px] mr-[22px]" />
          </Link>
        )}
        <Link to={'/cart'}>
          <Badge badgeContent={cartItems.length} color='primary'>
            <ShoppingCart sx={{ width: 32, height: 32 }} />
          </Badge>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[10vmin] left-0 w-full bg-gradient-to-r from-[#635dc0] to-[#3027ae] text-white flex flex-col items-center py-4 z-40 lg:hidden">
          <nav className="flex flex-col gap-6 text-xl font-roboto mb-4">
            {headerLinks.map((link, index) => (
              <Link
                key={index}
                to={`${link === 'Home' ? '/' : `/${link.toLowerCase()}`}`}
                onClick={toggleMobileMenu}
                className="hover:text-[#6A9AB0] duration-200"
              >
                {link}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6 text-[26px]">
            <IoSearch className="hover:text-[#6A9AB0] cursor-pointer" onClick={toggleSearchInput} />
            {isAuthenticated && user ? (
              <ProfileOptions user={user} />
            ) : (
              <Link to="/login" onClick={toggleMobileMenu}>
                <CgProfile className="hover:text-[#6A9AB0]" />
              </Link>
            )}
            <FaCartPlus className="hover:text-[#6A9AB0]" />
          </div>
          {showSearchInput && (
            <form onSubmit={searchSubmitHandler} className="w-full px-4 mt-4 flex">
              <input
                type="text"
                placeholder="Search Product...."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l-md text-black outline-none shadow-md"
              />
              <button
                type="submit"
                className="p-2 bg-orange-600 text-white rounded-r-md hover:bg-orange-500 transition duration-200"
              >
                Search
              </button>
            </form>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
