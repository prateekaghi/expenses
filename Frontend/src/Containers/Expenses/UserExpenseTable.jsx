import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/navigation/PageHeader";
import { useUserExpenses } from "../../hooks/useExpenses";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserExpenseTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, isError, error } = useUserExpenses({
    page: page + 1,
    limit,
  });
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
    { id: "category", label: "Category" },
    { id: "currency", label: "Currency" },
    { id: "amount", label: "Amount" },
  ];

  if (isLoading) return <p>Loading User Expenses</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      <PageHeader
        backTo={"/dashboard"}
        title={"Expense List"}
        actions={[
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("add");
            }}
          >
            Add Expense
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
      />
    </>
  );
};

export default UserExpenseTable;
