import React from "react";
import Welcome from "../../components/UserInfo/Welcome";
import Stats from "../../components/Cards/Stats";
import { Box, Grid } from "@mui/material";
import ProgressStat from "../../components/Cards/ProgressStat";
import SpendingDetails from "../../components/Cards/SpendingDetails";
import CurrenciesSummary from "../../components/Cards/CurrenciesSummary";
import TransactionsSummary from "../../components/Cards/TransactionsSummary";
import UserStats from "../../Containers/User/UserStats";

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
          <CurrenciesSummary />
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
