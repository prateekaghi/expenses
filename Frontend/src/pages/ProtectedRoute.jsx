import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { isTokenExpired } from "../utils/tokenFunctions";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  const userid = useAuthStore((state) => state.id);

  const tokenExpired = isTokenExpired(token);

  if (!token || !userid || tokenExpired) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
