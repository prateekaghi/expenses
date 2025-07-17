import React from "react";
import { useUserByID } from "../../hooks/useUsers";

const UserStat = () => {
  const { data, isLoading, isError, error } = useUserByID({
    page: 1,
    limit: 1000,
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default UserStat;
