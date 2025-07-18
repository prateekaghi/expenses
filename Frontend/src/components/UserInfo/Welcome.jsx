import React from "react";
import { Box, Typography } from "@mui/material";
import { useUserByID } from "../../hooks/useUsers";
import { getCurrentMonthYear } from "../../utils/dateUtility";

const Welcome = () => {
  const { data, isLoading, isError, error } = useUserByID({
    page: 1,
    limit: 1000,
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>{error}</p>;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        Welcome back, {data?.data?.first_name}! 👋
      </Typography>
      <Typography color="text.secondary">
        Here's your financial overview for {getCurrentMonthYear()}
      </Typography>
    </Box>
  );
};

export default Welcome;
