import React from "react";
import { Box, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const ClientHeader = ({ linksArray, button }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="white" position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>Logo</Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {linksArray.map((link) => {
              return (
                <Link key={link.path} to={link.path}>
                  <Button>{link.title}</Button>
                </Link>
              );
            })}
            {button}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ClientHeader;
