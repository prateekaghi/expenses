import React from "react";
import { Box, Typography } from "@mui/material";
import { getCurrentMonthYear } from "../../utils/dateUtility";
import { useAuthStore } from "../../store/authStore";

const Welcome = () => {
  const auth = useAuthStore.getState();

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        Welcome back, {auth.first_name}! 👋
      </Typography>
      <Typography color="text.secondary">
        Here's your financial overview for {getCurrentMonthYear()}
      </Typography>
    </Box>
  );
};

export default Welcome;
