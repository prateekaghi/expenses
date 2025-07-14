import React from "react";
import GenericForm from "../../components/Forms/GenericForm";
import PageHeader from "../../components/navigation/PageHeader";
import { useAddCategory } from "../../hooks/useCategories";
import { Box } from "@mui/material";

const AddCategoryPage = () => {
  const { mutateAsync, isPending } = useAddCategory();
  const initialState = { name: "" };

  const validationRules = {
    name: {
      required: true,
      message: "Category name is required.",
    },
  };

  const fieldConfigs = {
    name: {
      type: "text",
      label: "Category Name",
    },
  };
  const handleSubmit = async (data) => {
    const response = await mutateAsync({
      name: data.name,
      userid: "68714954b0c65006abe791b4",
    });
    return response;
  };
  return (
    <Box>
      <PageHeader backTo={"/category"} title={"Add Category"}></PageHeader>
      <GenericForm
        title="Add New Category"
        initialState={initialState}
        validationRules={validationRules}
        fieldConfigs={fieldConfigs}
        onSubmit={handleSubmit}
        submitLabel="Add Category"
        isLoading={isPending}
      />
    </Box>
  );
};

export default AddCategoryPage;
