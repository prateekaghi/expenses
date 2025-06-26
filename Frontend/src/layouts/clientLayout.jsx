import React from "react";
import { Outlet } from "react-router-dom";

const clientLayout = () => {
  return (
    <div>
      clientLayout
      <Outlet />
    </div>
  );
};

export default clientLayout;
