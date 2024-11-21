import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../layout/home/ProductCard.jsx';
import { getProduct } from '../../actions/productAction.js';
import Loading from '../layout/loader/Loading.jsx';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify'
import { CLEAR_ERROR } from '../../constants/productConstants.js'
import './Products.css';

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false); // State for filter visibility on small screens
  const allCategorys = ['Electronics', 'Clothing', 'Books', 'Toys'];
  const dispatch = useDispatch();
  const { products, error, loading, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => {
      let price = [...prev];
      if (name === 'min') {
        price[0] = value;
      } else if (name === 'max') {
        price[1] = value;
      }
      return price;
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error, dispatch])

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, priceRange, category, rating));
  }, [dispatch, keyword, currentPage, priceRange, category, rating]);


  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-start p-4">
        {/* Filter Button for Mobile */}
        <button
          className="lg:hidden mb-4 mt-11 p-2 bg-blue-500 text-white rounded-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filters Section */}
        <div className={`lg:relative lg:block ${showFilters ? "block" : "hidden"} w-full lg:w-64 p-4 bg-white lg:sticky lg:top-20 border border-gray-300 shadow-lg rounded-md mb-6 lg:mb-0`}>
          <h2 className="text-lg font-semibold mb-4 text-center border-b pb-2">Filters</h2>

          {/* Price Filter */}
          {filteredProductsCount > 0 && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-md font-semibold mb-2 border-b pb-1">Price</h3>
              <div>
                <label>Minimum:</label>
                <input
                  type="range"
                  max={25000}
                  name="min"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(e)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                <label>Maximum:</label>
                <input
                  type="range"
                  min={0}
                  max={25000}
                  name="max"
                  value={priceRange[1]}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  onChange={(e) => handlePriceRangeChange(e)}
                />
                <div className="flex justify-between mt-2">
                  <span>Min: ₹{priceRange[0]}</span>
                  <span>Max: ₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-md font-semibold mb-2 border-b pb-1">Category</h3>
            <div className="flex flex-col space-y-2">
              {allCategorys.map((item) => (
                <label className="flex items-center space-x-2" key={item}>
                  <input
                    type="radio"
                    className="text-blue-600 focus:ring-blue-500 rounded"
                    name="category"
                    value={item}
                    checked={category === item}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-md font-semibold mb-2 border-b pb-1">Rating</h3>
            <div className="flex flex-col space-y-2">
              {[5, 4, 3, 2, 1, 0].map((star) => (
                <label className="flex items-center space-x-2" key={star}>
                  <input
                    type="radio"
                    className="text-blue-600 focus:ring-blue-500 rounded"
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={() => setRating(star)}
                  />
                  <span>{star} Stars & Up</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            className="w-full p-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded"
            onClick={() => {
              setCategory('');
              setPriceRange([0, 25000]);
              setRating(0);
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h2 className="mt-24 border-b border-solid border-b-gray-300 w-[9vmax] mx-auto text-center text-lg lg:text-2xl font-roboto font-medium text-gray-600">Products</h2>
              <div className="flex flex-wrap justify-center px-2 sm:px-4 min-h-[60vh] gap-4">
                {products && products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {resultPerPage < filteredProductsCount && productsCount > 0 && (
                <div className="flex justify-center mt-6 font-garamond font-medium">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
