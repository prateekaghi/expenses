import React from "react";
import GenericForm from "../../components/Forms/GenericForm";
import { useAddCategory } from "../../hooks/useCategories";

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
    <GenericForm
      title="Add New Category"
      initialState={initialState}
      validationRules={validationRules}
      fieldConfigs={fieldConfigs}
      onSubmit={handleSubmit}
      submitLabel="Add Category"
      isLoading={isPending}
    />
  );
};

export default AddCategoryPage;
