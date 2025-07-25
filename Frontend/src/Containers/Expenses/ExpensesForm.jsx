import React, { useState, useEffect } from "react";
import GenericForm from "../../components/Forms/GenericForm";
import {
  useAddTransaction,
  useSingleTransaction,
  useUpdateTransaction,
} from "../../hooks/useTransactions";
import { useGetUserCategories } from "../../hooks/useCategories";
import { useCurrencies } from "../../hooks/useCurrencies";
import { useSearchParams } from "react-router-dom";
import { isoToDateInputFormat } from "../../utils/dateUtility";
import LoadingComponent from "../../components/Utility/LoadingComponent";
import { Box } from "@mui/material";

const ExpensesForm = ({ submitLabel, editing }) => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const {
    data: transactionData,
    isLoading: transactionIsLoading,
    isError: transactionIsError,
    error: transactionError,
  } = useSingleTransaction({
    transactionId,
    enabled: editing && Boolean(transactionId),
  });

  const {
    mutateAsync: updateTransactionFn,
    isPending: transactionUpdatePending,
  } = useUpdateTransaction();
  const [initialState, setInitialState] = useState({
    date: "",
    title: "",
    category: "",
    type: "",
    currency: "",
    amount: "",
  });
  const [renderForm, setRenderForm] = useState(false);
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

  const validationRules = {
    title: { required: true },
    amount: { required: true },
    category: { required: true },
    type: { required: true },
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
    type: {
      type: "select",
      label: "Transaction Type",
      options: [
        { label: "Expense", value: "expense" },
        { label: "Income", value: "income" },
      ],
    },
    currency: {
      type: "select",
      label: "Currency",
      options: currencyOptions,
    },
    date: { type: "date", label: "Transaction Date" },
  };

  const populateOptions = () => {
    const categoryOptions = userCategories?.data?.map((category) => {
      return { label: category.name, value: category.id };
    });
    const currencyOptions = currencyData?.data?.map((currency) => {
      return { label: currency.name, value: currency.value };
    });
    setCategoryOptions(categoryOptions);
    setCurrencyOptions(currencyOptions);
  };

  const handleSubmit = async (data) => {
    if (editing) {
      await updateTransactionFn({
        transactionId: transactionId,
        payload: data,
      });
    } else {
      await mutateAsync(data);
    }
  };

  useEffect(() => {
    if (userCategories && currencyData) {
      populateOptions();
    }
  }, [userCategories, currencyData]);

  useEffect(() => {
    if (editing) {
      if (transactionData) {
        setInitialState({
          date: isoToDateInputFormat(transactionData.data.date),
          title: transactionData.data.title,
          category: transactionData.data.category,
          type: transactionData.data.type,
          amount: transactionData.data.amount,
          currency: transactionData.data.currency,
        });
        setRenderForm(true);
      }
    } else {
      setRenderForm(true);
    }
  }, [editing, transactionData]);

  return (
    <Box>
      {renderForm || !editing ? (
        <GenericForm
          initialState={initialState}
          validationRules={validationRules}
          fieldConfigs={fieldConfigs}
          onSubmit={handleSubmit}
          submitLabel={submitLabel}
          isLoading={isPending}
          redirectUrl="/dashboard"
        />
      ) : (
        <LoadingComponent size="large" type="dots" color="black" text="" />
      )}
    </Box>
  );
};

export default ExpensesForm;
