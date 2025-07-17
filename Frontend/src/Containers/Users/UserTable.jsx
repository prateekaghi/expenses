import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import { useUsers } from "../../hooks/useUsers";

const UserTable = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, isError, error } = useUsers({
    page: page + 1,
    limit: limit,
  });
  const columns = [
    { id: "first_name", label: "First Name" },
    { id: "last_name", label: "Last Name" },
  ];
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (data) {
    console.log("data", data);
  }
  return (
    <CustomTable
      columns={columns}
      data={data.data || []}
      total={data.totalRecords || 0}
      page={page}
      limit={limit}
      loading={isLoading}
      onPageChange={setPage}
      onLimitChange={(newLimit) => {
        setLimit(newLimit);
        setPage(0);
      }}
    />
  );
};

export default UserTable;
