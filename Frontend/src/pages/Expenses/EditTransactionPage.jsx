import React from "react";
import PageHeader from "../../components/navigation/PageHeader";
import { Box } from "@mui/material";
import ExpensesForm from "../../Containers/Expenses/ExpensesForm";
const EditTransactionPage = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <PageHeader backTo={"/transactions"} title={"Edit Transaction"} />
      <ExpensesForm editing={true} submitLabel={"Update Transaction"} />
    </Box>
  );
};

export default EditTransactionPage;
