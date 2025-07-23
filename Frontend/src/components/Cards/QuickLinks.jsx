import React from "react";
import { Card, Typography, Grid, Box, Button } from "@mui/material";
import {
  PaidOutlined,
  CurrencyExchange,
  Public,
  ViewModule,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const links = [
  { name: "Expenses", path: "/expenses", icon: PaidOutlined },
  { name: "Category", path: "/categories", icon: ViewModule },
  { name: "Timezones", path: "/timezones", icon: Public },
  { name: "Currencies", path: "/currencies", icon: CurrencyExchange },
];

const QuickLinks = () => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        border: "1px solid #e4e4e7",
        padding: 5,
      }}
    >
      <Grid container spacing={2}>
        {links.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <Grid size={{ xs: 12, md: 3 }} key={index}>
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
