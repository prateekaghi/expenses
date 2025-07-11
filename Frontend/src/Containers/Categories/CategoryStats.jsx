import React from "react";
import { useCategories } from "../../hooks/useCategories";
import StatsCard from "../../components/Cards/StatsCard";

const CategoryStats = () => {
  const { data, isLoading, isError, error } = useCategories();
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <StatsCard data={data.data} title="Categories" period="Last month" />;
};

export default CategoryStats;
