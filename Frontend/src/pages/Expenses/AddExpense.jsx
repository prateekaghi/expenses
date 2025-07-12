import React from "react";
import GenericForm from "../../components/Forms/GenericForm";

const AddExpense = () => {
  return (
    <GenericForm
      title="Add New Category"
      initialState={{ name: "" }}
      validationRules={{
        name: {
          required: true,
          minLength: 2,
          message:
            "Category name is required and should be at least 2 characters.",
        },
      }}
      onSubmit={handleCategorySubmit}
      submitLabel="Add Category"
      isLoading={isPending}
    />
  );
};

export default AddExpense;
