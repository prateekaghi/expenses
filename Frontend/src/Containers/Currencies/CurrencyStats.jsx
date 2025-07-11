import React from "react";
import { useCurrencies } from "../../hooks/useCurrencies";
import StatsCard from "../../components/Cards/StatsCard";

const CurrencyStats = () => {
  const { data, isLoading, isError, error } = useCurrencies({
    page: 1,
    limit: 1000,
  });
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <StatsCard data={data.data} title="Currencies" period="Last month" />;
};

export default CurrencyStats;
