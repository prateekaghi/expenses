import React from "react";
import { Box, Typography, Card, Grid } from "@mui/material";
import {
  TrackChangesOutlined,
  DoneSharp,
  TrendingUpSharp,
  SmartphoneOutlined,
} from "@mui/icons-material";

const FeatureCard = ({ icon, title, description, items }) => (
  <Card elevation={3} sx={{ height: "100%", borderRadius: 5, padding: 4 }}>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {icon}
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
    <Box>
      {items.map((text, idx) => {
        return (
          <Box
            key={idx}
            sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
          >
            <DoneSharp color="success" />
            {text}
          </Box>
        );
      })}
    </Box>
  </Card>
);

const FeaturesSection = () => {
  return (
    <Box
      id="features"
      sx={{
        width: "100%",
        py: { xs: 12 },
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            letterSpacing: "-0.02em",
            fontSize: { xs: "2rem", sm: "3rem" },
          }}
        >
          Powerful Features for Smart Spending
        </Typography>
        <Typography
          sx={{
            mt: 2,
            maxWidth: "900px",
            mx: "auto",
            color: "text.secondary",
            fontSize: { md: "1.125rem", lg: "1rem", xl: "1.125rem" },
            lineHeight: 1.7,
          }}
        >
          Everything you need to understand and control your finances in one
          beautiful app.
        </Typography>
      </Box>

      <Grid container spacing={4} py={5} px={10}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            icon={<TrendingUpSharp sx={{ fontSize: 40 }} />}
            title="Smart Analytics"
            description="Get detailed insights into your spending patterns with interactive charts and reports."
            items={[
              "Monthly spending trends",
              "Category breakdowns",
              "Custom date ranges",
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            icon={<TrackChangesOutlined sx={{ fontSize: 40 }} />}
            title="Budget Management"
            description="Set budgets for different categories and get alerts when you're close to limits."
            items={["Category budgets", "Real-time alerts", "Goal tracking"]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            icon={<SmartphoneOutlined sx={{ fontSize: 40 }} />}
            title="Mobile First"
            description="Track expenses on the go with our intuitive mobile app and instant sync."
            items={["Quick expense entry", "Photo receipts", "Offline support"]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
