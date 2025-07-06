import React from "react";
import ExpenseForm from "../../components/Forms/ExpensesForm";
import { addExpenes } from "../../api/expensesApi";

const AddExpense = () => {
  const addExpenseHandler = async (e) => {
    const response = await addExpenes(e);
    console.log("res", response);
  };

  return <ExpenseForm onSubmit={addExpenseHandler} />;
};

export default AddExpense;
