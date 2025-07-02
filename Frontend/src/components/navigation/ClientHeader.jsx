import React from "react";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const linksData = [
  { title: "Home", path: "/" },
  { title: "Login", path: "/login" },
  { title: "Signup", path: "/signup" },
];

const ClientHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="white" position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>Logo</Box>
          <Box>
            {linksData.map((link) => {
              return (
                <Link key={link.path} to={link.path}>
                  <Button>{link.title}</Button>
                </Link>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ClientHeader;
