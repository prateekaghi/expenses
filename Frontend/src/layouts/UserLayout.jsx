import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ClientHeader from "../components/navigation/ClientHeader";
import { Box } from "@mui/material";
import FooterComponent from "../components/Footer/FooterComponent";
import { Logout } from "@mui/icons-material";
import { useAuthStore } from "../store/authStore";
import { isTokenExpired } from "../utils/tokenFunctions";
import UserHeader from "../components/navigation/UserHeader";

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const signOut = useAuthStore((state) => state.clearAuth);

  const logout = () => {
    signOut();
    navigate("/login");
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      logout();
    }
  }, [location.pathname, token, navigate, signOut]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <Box>
        <UserHeader />
        <Box
          sx={{
            p: 5,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <FooterComponent />
    </Box>
  );
};

export default UserLayout;
