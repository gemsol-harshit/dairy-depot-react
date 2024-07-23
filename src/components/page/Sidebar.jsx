import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants/sidebarLink";
import { AppColors } from "../../lib/helpers/colors";
import dairyGoLogo from "../../assets/images/dairy_go_logo.png";

const linkClass =
  "flex items-center gap-2 font-bold px-3 py-2 hover:bg-blue-500 hover:no-underline active:bg-blue-400 focus:bg-blue-600 rounded-sm text-base focus:outline-none";

export default function Sidebar() {
  const { pathname } = useLocation();
  const userRole =
    JSON.parse(sessionStorage.getItem("user"))?.role.toLowerCase() || "";

  const role = userRole === "superadmin" ? "Super Admin" : "Hub Admin";

  const handleLogout = () => {
    // Clear session storage and redirect to login
    sessionStorage.clear();
    window.location.href = "/login";

    // Prevent navigation back to dashboard
    window.history.replaceState(null, "", "/");
  };

  return (
    <div
      className="text-white w-60 p-3 flex flex-col"
      style={{
        backgroundColor: AppColors.appBlue,
        color: AppColors.appLight,
      }}
    >
      <div className="flex items-center gap-2 px-1 py-3">
        <img src={dairyGoLogo} alt="Dairy Go Logo" className="h-10" />
        <span className="text-lg">{role} Panel</span>
      </div>
      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} pathname={pathname} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-gray-200">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} pathname={pathname} />
        ))}
        <div
          className={classNames(linkClass, "cursor-pointer text-red-500")}
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link, pathname }) {
  return (
    <Link
      to={link.path}
      className={classNames(
        linkClass,
        pathname === link.path ? "bg-blue-400 text-white" : ""
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
