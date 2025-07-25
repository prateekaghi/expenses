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
    });
    return response;
  };
  return (
    <Box>
      <PageHeader backTo={"/categories"} title={"Add Category"}></PageHeader>
      <GenericForm
        title="Add New Category"
        initialState={initialState}
        validationRules={validationRules}
        fieldConfigs={fieldConfigs}
        onSubmit={handleSubmit}
        submitLabel="Add Category"
        isLoading={isPending}
        redirectUrl="/categories"
      />
    </Box>
  );
};

export default AddCategoryPage;
