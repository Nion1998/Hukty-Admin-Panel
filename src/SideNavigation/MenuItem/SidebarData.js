import { BsChatRightText } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineFindInPage, MdOutlineNotificationAdd } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { CiBoxes } from "react-icons/ci";
import { LuUsers2 } from "react-icons/lu";
import { MdEmojiTransportation } from "react-icons/md";

import {
  MdDownloading,
  MdOutlineAdminPanelSettings,
  MdOutlineContacts,
  MdOutlineInsertChartOutlined,
} from "react-icons/md";

export const SidebarData = [
  {
    id: 3,
    title: "Inventory",
    iconClass: <MdOutlineInventory />, // Directly assign the icon without curly braces
    submenus: [
      { title: "Brands", link: "brands" },
      { title: "Categories", link: "categories" },
      { title: "Variant Group", link: "variant-group" },
      { title: "Variant Option", link: "variant-option" },
      { title: "Products", link: "products" },
    ],
  },

  {
    id: 4,
    title: "Sales",
    link: "orders",
    iconClass: <CiBoxes />, // Directly assign the icon without curly braces
    submenus: [
      { title: "Order List", link: "orders" },
      { title: "Coupons", link: "coupons" },
      { title: "Reason List", link: "reason" },
    ],
  },
  {
    id: 5,
    title: "Couriers",
    link: "couriers",
    iconClass: <MdEmojiTransportation />,
  },
  {
    id: 6,
    title: "Users",
    link: "users",
    iconClass: <MdOutlineAdminPanelSettings />, // Directly assign the icon without curly braces
  },
  {
    id: 7,
    title: "Blog",
    iconClass: <MdOutlineContacts />, // Directly assign the icon without curly braces
    submenus: [{ title: "Blog List", link: "blog" }],
  },
  {
    id: 8,
    title: "Pages",
    link: "pages",
    iconClass: <MdOutlineFindInPage />, // Directly assign the icon without curly braces
  },
  {
    id: 10,
    title: "Settings",
    iconClass: <MdOutlineContacts />, // Directly assign the icon without curly braces
    submenus: [
      { title: "Website Information", link: "websiteinfo" },
      { title: "FAQ", link: "faq" },
    ],
  },
];
