import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f8fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Stack spacing={3} alignItems="center" maxWidth="sm">
        <Typography
          variant="h1"
          fontWeight="bold"
          color="primary"
          sx={{ fontSize: { xs: "4rem", md: "6rem" }, lineHeight: 1 }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Page not found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 500 }}
        >
          The page you're looking for might have been removed or doesn't exist.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
