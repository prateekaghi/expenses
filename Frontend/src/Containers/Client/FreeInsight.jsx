import React from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import {
  TrendingUp,
  ArrowForward,
  Check,
  PieChartOutline,
  CalendarToday,
  AttachMoney,
} from "@mui/icons-material";

const FreeInsightsSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12 },
        px: { xs: 6 },
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Chip
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Free Insights
                  </Box>
                }
                variant="outlined"
                color="info"
                sx={{ width: "fit-content" }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "1rem", sm: "2rem", xl: "3rem" },
                  fontWeight: "bold",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                See Where Your Money Goes
              </Typography>

              <Typography
                sx={{
                  maxWidth: 600,
                  fontSize: { md: "1.25rem" },
                }}
              >
                Even without a subscription, get valuable insights into your
                spending habits. Upgrade for advanced analytics and unlimited
                history.
              </Typography>
            </Box>
            <Box sx={{ display: "grid", gap: 2, my: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PieChartOutline sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  Category spending breakdown
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CalendarToday sx={{ fontSize: 20 }} />
                <Typography variant="body2">Last 30 days overview</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <AttachMoney sx={{ fontSize: 20 }} />
                <Typography variant="body2">Top spending categories</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Button size="large" variant="outlined" color="success">
                Try Free Version
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/placeholder.svg?height=400&width=550"
                alt="User dashboard sample"
                style={{
                  aspectRatio: "4 / 3",
                  borderRadius: "12px",
                  objectFit: "cover",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                  maxHeight: 450,
                  width: "100%",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FreeInsightsSection;
