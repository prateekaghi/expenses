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
        backTo={"/dashboard"}
        title={"Category list"}
        actions={[
          <Button
            variant="outlined"
            color="primary"
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
