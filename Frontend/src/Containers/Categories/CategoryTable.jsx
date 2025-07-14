import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import { useGetUserCategories } from "../../hooks/useCategories";
import { Box, Button } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";

const CategoryTable = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError, error } = useGetUserCategories({
    userid: "68714954b0c65006abe791b4",
    page: page + 1,
    limit: limit,
  });
  const columns = [
    { id: "name", label: "First Name" },
    { id: "user", label: "Last Name" },
  ];
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const tableActions = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <EditOutlined />
      </Box>
    );
  };

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
      renderActions={tableActions}
      tableSize={"90vh"}
    />
  );
};

export default CategoryTable;
