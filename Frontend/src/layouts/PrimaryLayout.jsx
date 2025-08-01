import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "../components/navigation/ClientHeader";
import { Box, Container } from "@mui/material";
import FooterComponent from "../components/Footer/FooterComponent";

const PrimaryLayout = () => {
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
        <ClientHeader />
        <Box>
          <Outlet />
        </Box>
      </Box>
      <FooterComponent />
    </Box>
  );
};

export default PrimaryLayout;
