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
import UserDashboard from "./pages/Dashboard/UserDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

//Utility pages
import NotFound from "./pages/NotFound";
import AuthExpiryWatcher from "./components/Utility/AutoExpiryWatcher";
import CurrencyList from "./pages/Currency/CurrencyList";
import TimezoneList from "./pages/Timezone/TimezoneList";
import EditCategoryPage from "./pages/Category/EditCategoryPage";

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
              <Route path="/transactions">
                <Route index element={<ExpenseList />} />
                <Route path="add" element={<AddExpensePage />} />
              </Route>
              <Route path="/categories">
                <Route index element={<CategoryList />} />
                <Route path="add" element={<AddCategoryPage />} />
                <Route path="edit" element={<EditCategoryPage />} />
              </Route>
              <Route path="/timezones">
                <Route index element={<TimezoneList />} />
              </Route>
              <Route path="/currencies">
                <Route index element={<CurrencyList />} />
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
