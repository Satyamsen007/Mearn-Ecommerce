import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/Footer.jsx';
import Home from './components/layout/home/Home.jsx';
import ProductDetails from './components/product/ProductDetails.jsx';
import Products from './components/product/Products.jsx';
import LoginSignUp from './components/authUser/LoginSignUp.jsx';
import Profile from './components/user/Profile.jsx';
import Loader from './components/layout/loader/Loading.jsx';
import { useEffect } from 'react';
import { loadUser } from './actions/userAuthenticateAction.js';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/route/ProtectedRoute.jsx';
import EditProfile from './components/user/EditProfile.jsx';
import ChangePassword from './components/user/ChangePassword.jsx';
import ForgotPassword from './components/user/ForgotPassword.jsx';
import ResetPassword from './components/user/ResetPassword.jsx';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartItems from './components/cart/CartItems.jsx';
import ShippingInfo from './components/cart/ShippingInfo.jsx';
import ConfirmOrder from './components/cart/ConfirmOrder.jsx';
function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <ToastContainer position="bottom-center" theme="colored" autoClose={3000} transition={Zoom} />
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/products/:keyword' element={<Products />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route exact path='/account' element={<ProtectedRoute element={Profile} />} />
        <Route exact path='/edit/profile' element={<ProtectedRoute element={EditProfile} />} />
        <Route exact path='/change/password' element={<ProtectedRoute element={ChangePassword} />} />
        <Route exact path='/forgot/password' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/cart' element={<CartItems />} />
        <Route exact path='/shipping' element={<ProtectedRoute element={ShippingInfo} />} />
        <Route exact path='/order/confirm' element={<ProtectedRoute element={ConfirmOrder} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
