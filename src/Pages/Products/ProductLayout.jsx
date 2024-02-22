import React from "react";
import { Outlet } from "react-router-dom";

const ProductLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default ProductLayout;
