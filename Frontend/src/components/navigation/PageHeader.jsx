import React from "react";
import { Box, Typography, IconButton, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, backTo, actions = [] }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        mb: 3,
        px: 3,
        py: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleBack} edge="start" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      {actions.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, md: 0 } }}>
          {actions.map((action, index) => (
            <Box key={index}>{action}</Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default PageHeader;
