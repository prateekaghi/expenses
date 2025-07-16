import React from "react";
import "./index.css";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//layouts
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import PrimaryLayout from "./layouts/PrimaryLayout";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExpenseList from "./pages/Expenses/ExpenseList";
import AddCategoryPage from "./pages/Category/AddCategoryPage";
import AddExpensePage from "./pages/Expenses/AddExpensePage";
import CategoryList from "./pages/Category/CategoryList";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

//Utility pages
import NotFound from "./pages/NotFound";
import AuthExpiryWatcher from "./components/Utility/AutoExpiryWatcher";

const App = () => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <BrowserRouter>
        <AuthExpiryWatcher />
        <Routes>
          <Route element={<PrimaryLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/dashboard">
                <Route index element={<UserDashboard />} />
              </Route>
              <Route path="/expenses">
                <Route index element={<ExpenseList />} />
                <Route path="add" element={<AddExpensePage />} />
              </Route>
              <Route path="/category">
                <Route index element={<CategoryList />} />
                <Route path="add" element={<AddCategoryPage />} />
              </Route>
            </Route>
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
