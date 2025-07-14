import React from "react";
import PageHeader from "../../components/navigation/PageHeader";
import { Button } from "@mui/material";
import CategoryTable from "../../Containers/Categories/CategoryTable";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        backTo={"/"}
        title={"Category list"}
        actions={[
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("add");
            }}
          >
            Add Category
          </Button>,
        ]}
      />
      <CategoryTable />
    </>
  );
};

export default CategoryList;
