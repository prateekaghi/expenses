import React from "react";
import { useUsers } from "../../hooks/useUsers";
import StatsCard from "../../components/Cards/StatsCard";

const UserStats = () => {
  const { data, isLoading, isError, error } = useUsers();
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <StatsCard data={data.data} title="Users" period="Last month" />;
};

export default UserStats;
