import { useState, useEffect } from "react";
import GenericForm from "../../components/Forms/GenericForm";
import PageHeader from "../../components/navigation/PageHeader";
import {
  useGetCategoryById,
  useUpdateCategory,
} from "../../hooks/useCategories";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const EditCategoryPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const { mutateAsync, isPending } = useUpdateCategory();
  const { data, isLoading, isError, error } = useGetCategoryById({
    categoryId: categoryId,
  });
  const [renderForm, setRenderForm] = useState(false);

  const [initialState, setInitialState] = useState({ name: "" });

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
      categoryId,
      payload: { name: data.name },
    });
    return response;
  };

  useEffect(() => {
    if (data) {
      if (data?.data?.name) {
        setInitialState({ name: data.data.name });
        setRenderForm(true);
      }
    }
  }, [data]);

  if (isLoading || isPending) return <p>Loading....</p>;
  if (isError) return <p>{error}</p>;

  return (
    <Box>
      <PageHeader backTo={"/categories"} title={"Edit Category"}></PageHeader>
      {renderForm && (
        <GenericForm
          editmode={true}
          initialState={initialState}
          validationRules={validationRules}
          fieldConfigs={fieldConfigs}
          onSubmit={handleSubmit}
          submitLabel="Update Category"
          isLoading={isLoading || isPending}
          redirectUrl="/categories"
        />
      )}
    </Box>
  );
};

export default EditCategoryPage;
