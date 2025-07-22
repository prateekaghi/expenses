import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  TrackChangesOutlined,
  DoneSharp,
  TrendingUpSharp,
  SmartphoneOutlined,
  ArrowRight,
  ArrowForward,
} from "@mui/icons-material";

const PricingCard = ({
  price,
  title,
  description,
  items,
  highlight,
  button,
}) => (
  <Card
    elevation={3}
    sx={{
      height: "100%",
      borderRadius: 5,
      padding: 4,
      border: highlight ? "1px solid black" : "",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">{title}</Typography>
          {highlight && <Chip label="Most Popular" color="info" size="small" />}
        </Box>
        <Typography variant="body1">{description}</Typography>
        <Typography variant="h4" fontWeight="bold">
          $ {price} <Typography variant="caption">/ month</Typography>
        </Typography>
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
    </Box>
    {button}
  </Card>
);

const featuresFree = [
  "Track up to 50 expenses/month",
  "Basic category insights",
  "30-day history",
  "Mobile app access",
];

const featuresPro = [
  "Unlimited expenses",
  "Advanced analytics & reports",
  "Unlimited history",
  "Budget alerts & goals",
  "Export to CSV/PDF",
  "Priority support",
];

const PricingSection = () => {
  return (
    <Box
      id="contact"
      sx={{
        width: "100%",
        py: { xs: 12 },
        backgroundColor: "#f0f0f0",
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
          Ready to Take Control?
        </Typography>
        <Typography
          sx={{
            mt: 2,
            maxWidth: "500px",
            mx: "auto",
            color: "text.secondary",
            fontSize: { md: "1.125rem", lg: "1rem", xl: "1.125rem" },
            lineHeight: 1.7,
          }}
        >
          Join thousands of users who have transformed their financial habits
          with ExpenseTracker.
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          textAlign: "center",
          my: 5,
        }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          sx={{
            backgroundColor: "#18181b",
            marginRight: 5,
            textTransform: "none",
          }}
        >
          Start Your free trial
        </Button>
        <Button
          variant="outlined"
          color="#ffffff"
          sx={{ textTransform: "none" }}
        >
          Schedule Demo
        </Button>
      </Box>
    </Box>
  );
};

export default PricingSection;
