import React from "react";
import {
  Home,
  BookCheck,
  CandlestickChart,
  UsersRound,
  User,
  List,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { useSelector } from 'react-redux';


function MenuBar() {
  const iconSize = 16;
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const cookie = new Cookies();

  const user = useSelector((state) => state.user.value);

  const userMenu = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      path: "/",
      isActive: currentPath === "/",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      path: "/profile",
      isActive: currentPath === "/profile",
    },
    {
      name: "Booking",
      icon: <BookCheck size={iconSize} />,
      path: "/profile/bookings",
      isActive: currentPath === "/profile/bookings",
    },
    // {
      // name: "Reports",
      // icon: <CandlestickChart size={iconSize} />,
      // path: "/profile/reports",
      // isActive: currentPath === "/profile/reports",
    // },
    {
      name: "Logout",
      icon: <LogOut size={iconSize} />,
      path: "/logout",
      isActive: currentPath === "/logout",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      path: "/",
      isActive: currentPath === "/",
    },
    {
      name: "Events",
      icon: <List size={iconSize} />,
      path: "/admin/events",
      isActive: currentPath.includes("/admin/events"),
    },
    {
      name: "Bookings",
      icon: <BookCheck size={iconSize} />,
      path: "/admin/bookings",
      isActive: currentPath.includes("/admin/bookings"),
    },
    // {
    //   name: "Reports",
    //   icon: <CandlestickChart size={iconSize} />,
    //   path: "/admin/reports",
    //   isActive: currentPath.includes("/admin/reports"),
    // },
    {
      name: "Users",
      icon: <UsersRound size={iconSize} />,
      path: "/admin/users",
      isActive: currentPath.includes("/admin/users"),
    },
    {
      name: "Logout",
      icon: <LogOut size={iconSize} />,
      path: "/admin/logout",
      isActive: currentPath === "/admin/logout",
    },
  ];

  const menuToBeRendered = user.isAdmin ? adminMenu : userMenu;

  return (
    <div className="flex flex-col p-4 bg-gray-800 text-white h-screen w-60">
      <h1 className="font-bold">
        Event
        <span className="text-(--gray) ml-2">Management</span>
      </h1>
      <p className="text-gray-500 text-[0.8rem] mt-2">{user.name}</p>
      <div className="flex flex-col gap-10 mt-10">
        {menuToBeRendered.map((menu, index) => (
          <div
            key={index}
            onClick={() => {
              if (menu.name === "Logout") {
                cookie.remove("token");
                navigate("/login");
              } else {
                navigate(menu.path);
              }
            }}
            className={`flex items-center gap-5 p-2 rounded-lg cursor-pointer  ${
              menu.isActive
                ? "bg-[#fff] font-semibold text-(--color-primary)"
                : "hover:bg-gray-700"
            }`}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuBar;
