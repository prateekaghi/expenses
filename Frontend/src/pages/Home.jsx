import React from "react";
import { Grid } from "@mui/material";
import UserStats from "../Containers/Users/UserStats";

const Home = () => {
  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <UserStats />
      </Grid>
    </Grid>
  );
};

export default Home;
