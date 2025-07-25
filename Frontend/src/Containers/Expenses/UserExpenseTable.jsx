import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/navigation/PageHeader";
import {
  useUserTransactions,
  useDeleteTransaction,
} from "../../hooks/useTransactions";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";

const UserExpenseTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, isError, error } = useUserTransactions({
    page: page + 1,
    limit,
  });

  const { mutateAsync, isSuccess } = useDeleteTransaction();

  const deleteHandler = async (data) => {
    try {
      const response = await mutateAsync({ transactionId: data.id });
      console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      id: "date",
      label: "Date",
      render: (row) =>
        new Date(row.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    { id: "title", label: "Title" },
    {
      id: "category",
      label: "Category",
      render: (row) => row.category.name,
    },
    { id: "currency", label: "Currency" },
    { id: "amount", label: "Amount" },
  ];

  const tableActions = (row) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={isLoading}
          onClick={() => navigate(`/transactions/edit?transactionId=${row.id}`)}
        >
          <EditOutlined />
        </IconButton>
        <IconButton disabled={isLoading} onClick={() => deleteHandler(row)}>
          <DeleteOutlineOutlined />
        </IconButton>
      </Box>
    );
  };

  if (isLoading) return <p>Loading User Expenses</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      <PageHeader
        backTo={"/dashboard"}
        title={"Transactions List"}
        actions={[
          <Button
            startIcon={<Add />}
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              navigate("add");
            }}
          >
            Add Transaction
          </Button>,
          ,
        ]}
      />
      <CustomTable
        columns={columns}
        data={data?.data}
        limit={limit}
        page={page}
        total={data.totalRecords}
        loading={isLoading}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(0);
        }}
        renderActions={tableActions}
        tableSize={"80vh"}
      />
    </>
  );
};

export default UserExpenseTable;
