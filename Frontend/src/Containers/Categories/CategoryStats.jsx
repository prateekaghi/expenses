import React from "react";
import { useGetCategories } from "../../hooks/useCategories";
import StatsCard from "../../components/Cards/StatsCard";

const CategoryStats = () => {
  const { data, isLoading, isError, error } = useGetCategories({
    page: 1,
    limit: 1000,
  });
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <StatsCard data={data.data} title="Categories" period="Last month" />;
};

export default CategoryStats;
