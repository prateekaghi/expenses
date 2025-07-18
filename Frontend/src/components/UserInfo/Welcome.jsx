import React from "react";
import { Box, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        Welcome back, John! 👋
      </Typography>
      <Typography color="text.secondary">
        Here's your financial overview for January 2024
      </Typography>
    </Box>
  );
};

export default Welcome;
