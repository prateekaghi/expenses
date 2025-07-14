import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import {
  useGetUserCategories,
  useDeleteCategory,
} from "../../hooks/useCategories";
import { Box, IconButton } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const CategoryTable = () => {
  const userid = "68714954b0c65006abe791b4";
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const { data, isLoading, isError, error, isFetching } = useGetUserCategories({
    userid,
    page: page + 1,
    limit: limit,
  });
  const { mutate, isPending } = useDeleteCategory();
  const columns = [
    { id: "name", label: "First Name" },
    { id: "user", label: "Last Name" },
  ];
  if (isLoading) return <p>Loading...</p>;
  if (isFetching) return <p>Fetching...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const tableActions = (row) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={isPending || isLoading}
          onClick={() => {
            mutate({
              id: row.id,
              payload: { userid },
            });
          }}
        >
          <DeleteOutlineOutlined />
        </IconButton>
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
