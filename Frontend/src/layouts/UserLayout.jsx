import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ClientHeader from "../components/navigation/ClientHeader";
import { Box, IconButton } from "@mui/material";
import FooterComponent from "../components/Footer/FooterComponent";
import { Logout } from "@mui/icons-material";
import { useAuthStore } from "../store/authStore";
const linksData = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Expenses", path: "/expenses" },
  { title: "Categories", path: "/category" },
];
const UserLayout = () => {
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.clearAuth);

  const logout = () => {
    signOut();
    navigate("/login");
  };
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
        <ClientHeader
          linksArray={linksData}
          button={
            <IconButton onClick={logout}>
              <Logout />
            </IconButton>
          }
        />
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
