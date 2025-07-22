import { Box, Typography, Button, Chip, useTheme, Grid } from "@mui/material";
import { TrendingUp, ArrowForward, Check } from "@mui/icons-material";
import dashboardImage from "../../assets/dashboard.png";

const HeroSection = () => {
  const theme = useTheme();

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
                    <TrendingUp
                      style={{ width: 12, height: 12, marginRight: 4 }}
                    />
                    Smart Financial Insights
                  </Box>
                }
                variant="outlined"
                color="info"
                sx={{ width: "fit-content" }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", sm: "3rem", xl: "4rem" },
                  fontWeight: "bold",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                Take Control of Your Expenses
              </Typography>

              <Typography
                sx={{
                  maxWidth: 600,
                  color: theme.palette.text.secondary,
                  fontSize: { md: "1.25rem" },
                }}
              >
                Track, analyze, and optimize your spending with powerful
                insights. Get a clear picture of where your money goes and make
                smarter financial decisions.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Button
                size="large"
                variant="contained"
                endIcon={<ArrowForward style={{ width: 16, height: 16 }} />}
                color="success"
              >
                Start Free Trial
              </Button>
              <Button size="large" variant="outlined">
                View Demo
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                marginTop: 2,
                fontSize: "0.875rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Check style={{ width: 16, height: 16, color: "green" }} />
                14-day free trial
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Check style={{ width: 16, height: 16, color: "green" }} />
                No credit card required
              </Box>
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
                src={dashboardImage}
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

export default HeroSection;
