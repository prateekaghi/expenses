import React from "react";
import { useTimezones } from "../../hooks/useTimezones";
import StatsCard from "../../components/Cards/StatsCard";

const TimezoneStats = () => {
  const { data, isLoading, isError, error } = useTimezones();
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <StatsCard data={data.data} title="Timezones" period="Last month" />;
};

export default TimezoneStats;
