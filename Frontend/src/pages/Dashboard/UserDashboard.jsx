import React from "react";
import { Box, Grid } from "@mui/material";
import Welcome from "../../components/UserInfo/Welcome";
import SpendingDetails from "../../components/Cards/SpendingDetails";
import CurrenciesSummary from "../../components/Cards/CurrenciesSummary";
import TransactionsSummary from "../../components/Cards/TransactionsSummary";
import UserStats from "../../Containers/User/UserStats";
import QuickLinks from "../../components/Cards/QuickLinks";

const UserDashboard = () => {
  return (
    <Box>
      <Box mb={4}>
        <Welcome />
      </Box>
      <UserStats />
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SpendingDetails />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              gap: 2,
            }}
          >
            <QuickLinks />
            <CurrenciesSummary />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12 }}>
          <TransactionsSummary />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
