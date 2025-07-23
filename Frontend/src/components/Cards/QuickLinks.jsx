import React from "react";
import { Card, Typography, Grid, Box, Button } from "@mui/material";
import { PaidOutlined } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate } from "react-router-dom";

const links = [
  { name: "Expenses List", path: "/expenses", icon: PaidOutlined },
  { name: "Category List", path: "/category", icon: PublicIcon },
];

const QuickLinks = () => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        border: "1px solid #e4e4e7",
        height: "100%",
        padding: 5,
      }}
    >
      <Grid container spacing={2}>
        {links.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginBottom: 4,
                  padding: 2,
                  backgroundColor: "#eff6ff",
                  color: "#1e40af",
                  border: "1px solid #1e40af",
                  borderRadius: "0.5rem",
                  "&:hover": {
                    backgroundColor: "#dbeafe",
                    borderColor: "#1d4ed8",
                  },
                }}
                onClick={() => {
                  navigate(link.path);
                }}
              >
                <IconComponent
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                {link.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default QuickLinks;
