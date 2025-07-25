import React from "react";
import { Grid } from "@mui/material";
import { LanguageRounded, SellOutlined } from "@mui/icons-material";
import Stats from "../../components/Cards/Stats";
import { useUserTransactionSummary } from "../../hooks/useTransactions";
import { useGetUserCategories } from "../../hooks/useCategories";
import { useCurrencies } from "../../hooks/useCurrencies";
import CategorySummary from "../../components/Cards/CategorySummary";
const UserStats = () => {
  const { data, isLoading, isError, error } = useUserTransactionSummary();
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
    error: categoryErrorMessage,
  } = useGetUserCategories({ page: 1, limit: 10000 });
  const {
    data: currencyData,
    isLoading: currencyLoading,
    isError: currencyError,
    error: currencyErrorMessage,
  } = useCurrencies({ page: 1, limit: 10000 });

  if (isLoading || categoryLoading || currencyLoading) {
    return <p>Loading Data...</p>;
  }

  if (isError || categoryError || currencyError) {
    return <p>{error || categoryErrorMessage || currencyErrorMessage}</p>;
  }

  return (
    <>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stats
            title={"Total Lifetime Expense"}
            data={data?.data?.lifetimeExpense}
            color="error.main"
            icon="expense"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stats
            title={"Total Lifetime Income"}
            data={data?.data?.lifetimeIncome}
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
          <Stats
            title={"This Month Expenses"}
            data={data?.data?.monthlyExpense}
            color="error.main"
            icon="monthly-expense"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Stats
            title={"This Month Income"}
            data={data?.data?.monthlyIncome}
            color="success.main"
            icon="monthly-income"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <CategorySummary
            title={"Supported Currencies"}
            totalRecords={currencyData.totalRecords || 0}
            subtitle={"Multi-currency support"}
            icon={<LanguageRounded />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <CategorySummary
            title="Total Categories"
            totalRecords={categoryData.totalRecords || 0}
            subtitle={"Active spending categories"}
            icon={<SellOutlined />}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UserStats;
