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
import { useCurrencies } from "../../hooks/useCurrencies";
import { useUserByID } from "../../hooks/useUsers";
const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"];

const CurrenciesSummary = () => {
  const { data, isLoading, error, isError } = useCurrencies({
    page: 1,
    limit: 1000,
  });
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
    isError: userIsError,
  } = useUserByID({ page: 1, limit: 10 });

  if (isLoading || userIsLoading) return <p>Loading...</p>;
  if (isError || userIsError) return <p>{error || userError}</p>;

  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        border: "1px solid #e4e4e7",
        height: "100%",
      }}
    >
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
          {data.data.map((currency, index) => (
            <Grid size={{ xs: 6 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  bgcolor: "#f9fafb",
                  borderRadius: 2,
                  border: "1px solid #d6d7d9",
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  {currency.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} p={2} bgcolor="#eff6ff" borderRadius={2}>
          <Typography variant="body2" sx={{ color: "#1e40af" }}>
            <PublicIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Primary currency: {userData.data.currency} • Auto-conversion enabled
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrenciesSummary;
