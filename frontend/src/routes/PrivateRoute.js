import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../services/authService";

const PrivateRoute = () => {
  return getAuthToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;