import React, { useState, useEffect } from "react";
import PageHeader from "../../components/navigation/PageHeader";
import GenericForm from "../../components/Forms/GenericForm";
import { useAddTransaction } from "../../hooks/useTransactions";
import { useGetUserCategories } from "../../hooks/useCategories";
import { useCurrencies } from "../../hooks/useCurrencies";

const ExpensesForm = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const { mutateAsync, isPending } = useAddTransaction();
  const { data: userCategories, isLoading: categoriesLoading } =
    useGetUserCategories({
      page: 1,
      limit: 1000,
    });
  const { data: currencyData, isLoading: currencyLoading } = useCurrencies({
    page: 1,
    limit: 1000,
  });

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
      options: categoryOptions,
    },
    currency: {
      type: "select",
      label: "Currency",
      options: currencyOptions,
    },
    date: { type: "date", label: "Date" },
  };

  const populateOptions = () => {
    const categoryOptions = userCategories.data.map((category) => {
      return { label: category.name, value: category.id };
    });
    const currencyOptions = currencyData.data.map((category) => {
      return { label: category.name, value: category.value };
    });
    setCategoryOptions(categoryOptions);
    setCurrencyOptions(currencyOptions);
  };

  const handleSubmit = async (data) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    if (userCategories && currencyData) {
      populateOptions();
    }
  }, [userCategories, currencyData]);

  return (
    <div>
      <PageHeader backTo={"/expenses"} title={"Add Expense"} />
      <GenericForm
        title="Add Expense"
        initialState={initialState}
        validationRules={validationRules}
        fieldConfigs={fieldConfigs}
        onSubmit={handleSubmit}
        submitLabel="Add Expense"
        isLoading={isPending}
        redirectUrl="/expenses"
      />
    </div>
  );
};

export default ExpensesForm;
