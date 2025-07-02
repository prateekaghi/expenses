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

const App = () => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrimaryLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
