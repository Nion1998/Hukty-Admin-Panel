import React from "react";
import { Outlet } from "react-router-dom";

const CouponLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default CouponLayout;
