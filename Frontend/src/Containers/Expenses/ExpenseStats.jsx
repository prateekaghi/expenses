import React from "react";
import { useExpenses } from "../../hooks/useExpenses";
import StatsCard from "../../components/Cards/StatsCard";

const ExpenseStats = () => {
  const { data, isLoading, isError, error } = useExpenses({
    page: 1,
    limit: 1000,
  });
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <StatsCard data={data.data} title="Expenses" period="Last month" />;
};

export default ExpenseStats;
