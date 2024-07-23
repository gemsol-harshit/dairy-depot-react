import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  // HiOutlineDocumentText,
  // HiOutlineAnnotation,
  // HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  // HiOutlinePhotograph,
  HiOutlineUserAdd,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "agent",
    label: "Agent",
    path: "/agent",
    icon: <HiOutlineUserAdd />,
  },
  {
    key: "products",
    label: "Products",
    path: "/products",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/orders",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "users",
    label: "User Management",
    path: "/user",
    icon: <HiOutlineUsers />,
  },
  // {
  //   key: "transactions",
  //   label: "Transactions",
  //   path: "/transactions",
  //   icon: <HiOutlineDocumentText />,
  // },
  // {
  //   key: "messages",
  //   label: "Messages",
  //   path: "/messages",
  //   icon: <HiOutlineAnnotation />,
  // },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  // {
  //   key: "support",
  //   label: "Help & Support",
  //   path: "/support",
  //   icon: <HiOutlineQuestionMarkCircle />,
  // },
];
