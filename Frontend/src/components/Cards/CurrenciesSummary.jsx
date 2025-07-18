import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"];

const CurrenciesSummary = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight="medium">
            Supported Currencies
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Track expenses in multiple currencies
          </Typography>
        }
      />

      <CardContent>
        <Grid container spacing={2}>
          {currencies.map((currency, index) => (
            <Grid item xs={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  bgcolor: "grey.50",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  {currency}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} p={2} bgcolor="blue.50" borderRadius={2}>
          <Typography variant="body2" sx={{ color: "blue.800" }}>
            <PublicIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Primary currency: USD • Auto-conversion enabled
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrenciesSummary;
