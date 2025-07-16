import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import "./index.css";
import { Box } from "@mui/material";
import AuthLayout from "./layouts/AuthLayout";
import PrimaryLayout from "./layouts/PrimaryLayout";
import ExpenseList from "./pages/Expenses/ExpenseList";
import UserLayout from "./layouts/UserLayout";
import AddCategoryPage from "./pages/Category/AddCategoryPage";
import AddExpensePage from "./pages/Expenses/AddExpensePage";
import CategoryList from "./pages/Category/CategoryList";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrimaryLayout />}>
            <Route path="/" element={<Home />} />
          </Route>{" "}
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
          </Route>
          <Route path="/expenses" element={<UserLayout />}>
            <Route index element={<ExpenseList />} />
            <Route path="add" element={<AddExpensePage />} />
          </Route>
          <Route path="/category" element={<UserLayout />}>
            <Route index element={<CategoryList />} />
            <Route path="add" element={<AddCategoryPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
