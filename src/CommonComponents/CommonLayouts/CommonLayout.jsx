import React from "react";
import { Outlet } from "react-router-dom";
import "./CommonLayout.css";

const CommonLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default CommonLayout;
