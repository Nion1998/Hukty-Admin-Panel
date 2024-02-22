import React from "react";
import { Outlet } from "react-router-dom";

const CourierLayout = () => {
  return <div>{Outlet}</div>;
};

export default CourierLayout;
