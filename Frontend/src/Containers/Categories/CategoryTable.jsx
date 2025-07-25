import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import {
  useGetUserCategories,
  useDeleteCategory,
} from "../../hooks/useCategories";
import { Box, IconButton } from "@mui/material";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CategoryTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(25);
  const { data, isLoading, isError, error, isFetching } = useGetUserCategories({
    page: page + 1,
    limit: limit,
  });
  const { mutateAsync, isPending, isSuccess } = useDeleteCategory();
  const columns = [
    { id: "name", label: "Title" },
    {
      id: "createdAt",
      label: "Date Added",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      id: "updatedAt",
      label: "Date Updated",
      render: (row) =>
        new Date(row.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
  ];
  if (isLoading) return <p>Loading...</p>;
  if (isFetching) return <p>Fetching...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const deleteHandler = async (data) => {
    try {
      const response = await mutateAsync({ categoryId: data.id });
    } catch (error) {
      console.log(error);
    }
  };

  const tableActions = (row) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={isPending || isLoading}
          onClick={() => navigate(`/categories/edit?categoryId=${row.id}`)}
        >
          <EditOutlined />
        </IconButton>
        <IconButton
          disabled={isPending || isLoading}
          onClick={() => deleteHandler(row)}
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
