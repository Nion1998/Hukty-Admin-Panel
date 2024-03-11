import React from "react";
import { Outlet } from "react-router-dom";

const BannerLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default BannerLayout;
