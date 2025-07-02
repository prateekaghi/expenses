import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "../components/navigation/ClientHeader";
import { Box } from "@mui/material";
import FooterComponent from "../components/Footer/FooterComponent";

const AuthLayout = () => {
  return (
    <Box>
      <Outlet />
      <FooterComponent />
    </Box>
  );
};

export default AuthLayout;
