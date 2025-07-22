import React from "react";
import { Box, Typography, Button, Link as MuiLink } from "@mui/material";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ClientHeader = () => {
  const navigate = useNavigate();
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "64px",
        px: { xs: 2, lg: 3 },
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <MuiLink
        href="#"
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "inherit",
        }}
      >
        <AccountBalanceWalletOutlined style={{ width: 32, height: 32 }} />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
          ExpenseTracker
        </Typography>
      </MuiLink>

      <Box
        component="nav"
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 3 },
          ml: "auto",
        }}
      >
        <MuiLink
          href="#features"
          variant="body2"
          underline="hover"
          sx={{ fontWeight: 500, color: "inherit" }}
        >
          Features
        </MuiLink>
        <MuiLink
          href="#pricing"
          variant="body2"
          underline="hover"
          sx={{ fontWeight: 500, color: "inherit" }}
        >
          Pricing
        </MuiLink>
      </Box>

      <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/login")}
          sx={{ px: 5 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default ClientHeader;
