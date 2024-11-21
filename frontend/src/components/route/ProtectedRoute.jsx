import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/loader/Loading";

// This will wrap the element inside a protected route
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />; // or your loading component
  }

  // If the user is not authenticated, redirect them to login
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
