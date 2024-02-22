import React from "react";
import { Outlet } from "react-router-dom";

const BrandLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default BrandLayout;
