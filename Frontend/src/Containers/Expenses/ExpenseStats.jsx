import React from "react";
import { useTransactions } from "../../hooks/useTransactions";
import StatsCard from "../../components/Cards/StatsCard";

const ExpenseStats = () => {
  const { data, isLoading, isError, error } = useTransactions({
    page: 1,
    limit: 1000,
  });
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <StatsCard data={data.data} title="Expenses" period="Last month" />;
};

export default ExpenseStats;
