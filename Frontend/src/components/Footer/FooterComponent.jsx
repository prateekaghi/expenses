import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
const FooterComponent = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#212121",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default FooterComponent;
