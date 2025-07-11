import React from "react";
import { Grid } from "@mui/material";
import UserStats from "../Containers/Users/UserStats";
import TimezoneStats from "../Containers/Timezones/TimezoneStats";
import CategoryStats from "../Containers/Categories/CategoryStats";
import CurrencyStats from "../Containers/Currencies/CurrencyStats";
import ExpenseStats from "../Containers/Expenses/ExpenseStats";
import CurrencyTable from "../Containers/Currencies/CurrencyTable";
import UserTable from "../Containers/Users/UserTable";

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <UserStats />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TimezoneStats />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CategoryStats />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CurrencyStats />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ExpenseStats />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CurrencyTable />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <UserTable />
      </Grid>
    </Grid>
  );
};

export default Home;
