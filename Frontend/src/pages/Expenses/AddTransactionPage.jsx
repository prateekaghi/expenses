import React from "react";
import ExpensesForm from "../../Containers/Expenses/ExpensesForm";
import { Box } from "@mui/material";
import PageHeader from "../../components/navigation/PageHeader";

const AddExpensePage = () => {
  return (
    <Box>
      <PageHeader title={"Add Transaction"} backTo={"/dashboard"} />
      <ExpensesForm submitLabel={"Add Transaction"} />
    </Box>
  );
};

export default AddExpensePage;
