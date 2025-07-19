import React from "react";
import { Grid } from "@mui/material";
import Stats from "../../components/Cards/Stats";
import { useUserTransactionSummary } from "../../hooks/useTransactions";
import ProgressStat from "../../components/Cards/ProgressStat";
const UserStats = () => {
  const { data, isLoading, isError, error } = useUserTransactionSummary();

  if (isLoading) {
    return <p>Loading user summary...</p>;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stats
            title={"Total Lifetime Expense"}
            data={data?.data?.expense}
            color="error.main"
            icon="expense"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stats
            title={"Total Lifetime Income"}
            data={data?.data?.income}
            color="success.main"
            icon="income"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stats
            title={"Net Worth"}
            data={data?.data?.networth}
            color="#2563EB"
            icon="default"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <ProgressStat />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <ProgressStat />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <ProgressStat />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <ProgressStat />
        </Grid>
      </Grid>
    </>
  );
};

export default UserStats;
