import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import logoName from "./image/logoName.png";
import logo from "./image/logo.jpg";
import "./MainLayout.css";
import { useEffect } from "react";
import { useRef } from "react";

import {
  MdOutlineBrandingWatermark,
  MdOutlineContactPage,
  MdOutlineDownloadForOffline,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { TbChartBar } from "react-icons/tb";
import { AiOutlineBorderBottom, AiOutlineHome } from "react-icons/ai";
import { Accordion, NavLink } from "react-bootstrap";
import { BiCategory, BiHomeAlt } from "react-icons/bi";
import Navbar from "./Navbar";
import { SidebarData } from "./MenuItem/SidebarData";
import MenuItem from "./MenuItem/MenuItem";

const MainLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const SidebarSwap = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const menuRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (
        sidebarToggle &&
        window.innerWidth < 992 &&
        !menuRef.current.contains(e.target)
      ) {
        setSidebarToggle(false);
      }
    };

    if (window.innerWidth < 992) {
      document.addEventListener("mousedown", handler);
    }

    return () => {
      if (window.innerWidth < 992) {
        document.removeEventListener("mousedown", handler);
      }
    };
  }, [sidebarToggle, setSidebarToggle]);

  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // const menuItem = [
  //   {
  //     id: 1,
  //     title: "Dashboard",
  //     icon: AiOutlineHome,
  //     path: "/",
  //     subMenus: [],
  //   },
  //   {
  //     id: 2,
  //     title: "Manage Staffs",
  //     icon: TbChartBar,
  //     path: "/manage-staff",
  //     subMenus: [],
  //   },
  //   {
  //     id: 3,
  //     title: "Manage Products",
  //     icon: MdOutlineDownloadForOffline,
  //     path: "",
  //     subMenus: [
  //       {label: "Categories", path: "/manage-products/categories"},
  //       {label: "Brands", path: "/manage-products/brands"},
  //       {label: "Units", path: "/manage-products/units"},
  //       {label: "Products", path: "/manage-products/products"},
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "Warehouses",
  //     icon: FaWarehouse,
  //     path: "/home/transactions",
  //     subMenus: [],
  //   },
  //   {
  //     id: 5,
  //     title: "Customers",
  //     icon: IoIosPeople,
  //     path: "/home/withdrawals",
  //     subMenus: [],
  //   },
  // ];

  const handleMenuClick = (index) => {
    console.log(index);
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      if (isHovered || sidebarToggle) {
        setActiveMenu(index);
      }
    }
  };

  return (
    <section className="sidebar-div ">
      <div className="sidebar-container ">
        <div
          ref={menuRef}
          className={`sidebar shadow-lg ${
            !sidebarToggle || isHovered || window.innerWidth < 992
              ? "absolute"
              : ""
          }`}
          style={{
            backgroundColor: isHovered || sidebarToggle ? "" : "",
            width:
              sidebarToggle || isHovered
                ? window.innerWidth < 992
                  ? "300px"
                  : "300px"
                : window.innerWidth < 992
                ? "0px"
                : "80px",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="top-side d-flex justify-content-center align-items-center"
            style={{ width: sidebarToggle || isHovered ? "240px" : "80px" }}
          >
            <img
              className="logo img-fluid p-3"
              src={sidebarToggle || isHovered ? logoName : logo}
              alt=""
            />
          </div>
          {/* Menu Items */}
          <div className="bottom-side-container">
            <div className="scrollable-content">
              <Accordion flush>
                <div className="dashboard mt-2 ">
                  <Accordion.Item className="my-0">
                    <Link to="/admin">
                      <Accordion.Header>
                        <span className="fs-23-700 mb-1 ">
                          {sidebarToggle || isHovered ? (
                            <AiOutlineHome></AiOutlineHome>
                          ) : (
                            <AiOutlineHome className="fw-bold fs-5 ms-1"></AiOutlineHome>
                          )}
                        </span>
                        <span className="ms-3 fs-18-500 ">
                          {sidebarToggle || isHovered ? "Dashboard" : null}
                        </span>
                      </Accordion.Header>
                    </Link>
                  </Accordion.Item>
                </div>

                {SidebarData.map((item, index) => (
                  <MenuItem
                    key={index}
                    id={index}
                    title={item.title}
                    link={item.link}
                    iconClass={item.iconClass}
                    submenus={item.submenus || []}
                    sidebarToggle={sidebarToggle}
                    isHovered={isHovered}
                  />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        {/* Main Area */}
        <main
          className="main-area w-100"
          style={{
            marginLeft: sidebarToggle
              ? window.innerWidth < 992
                ? "0px"
                : "240px"
              : window.innerWidth < 992
              ? "0px"
              : "75px",
          }}
        >
          <Navbar onToggle={SidebarSwap}></Navbar>
          <div className="outlet p-2 p-lg-3">
            {" "}
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </section>
  );
};

export default MainLayout;
