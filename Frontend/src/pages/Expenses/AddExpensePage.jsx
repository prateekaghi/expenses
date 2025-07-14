import React from "react";
import GenericForm from "../../components/Forms/GenericForm";
import { useAddExpense } from "../../hooks/useExpenses";

const AddExpensePage = () => {
  const { mutateAsync, isPending } = useAddExpense();

  const initialState = {
    title: "",
    amount: "",
    category: "",
    currency: "",
    date: "",
  };

  const validationRules = {
    title: { required: true },
    amount: { required: true },
    category: { required: true },
    currency: { required: true },
    date: { required: true },
  };

  const fieldConfigs = {
    title: { type: "text", label: "Expense Title" },
    amount: { type: "number", label: "Amount" },
    category: {
      type: "select",
      label: "Category",
      options: [
        { label: "Food", value: "food" },
        { label: "Travel", value: "travel" },
        { label: "Utilities", value: "utilities" },
      ],
    },
    currency: {
      type: "select",
      label: "Currency",
      options: [
        { label: "USD", value: "usd" },
        { label: "CAD", value: "cad" },
        { label: "INR", value: "inr" },
      ],
    },
    date: { type: "date", label: "Date" },
  };

  const handleSubmit = async (data) => {
    await mutateAsync(data);
  };

  return (
    <GenericForm
      title="Add Expense"
      initialState={initialState}
      validationRules={validationRules}
      fieldConfigs={fieldConfigs}
      onSubmit={handleSubmit}
      submitLabel="Add Expense"
      isLoading={isPending}
    />
  );
};

export default AddExpensePage;
