import React from "react";
import { Outlet } from "react-router-dom";

const CategoriesLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default CategoriesLayout;
