import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "../components/navigation/ClientHeader";
import { Box, Container } from "@mui/material";
import FooterComponent from "../components/Footer/FooterComponent";
const linksData = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Expenses", path: "/expenses" },
  { title: "Categories", path: "/category" },
];
const UserLayout = () => {
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
        <ClientHeader linksArray={linksData} />
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
