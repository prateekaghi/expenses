import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  const userid = useAuthStore((state) => state.id);

  if (!token || !userid) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
