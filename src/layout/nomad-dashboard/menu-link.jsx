"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import {
  AnchorTag,
  Button,
  Drawer,
  Iconify,
  Typography,
} from "@/src/components";
import { BgIcon } from "@/src/components/bg-icon";
import { AuthLinks } from "@/src/_mock/_menu";
import Link from "next/link";
import { paths } from "@/src/contants";

export const NomadDashboardMenu = ({ isOpen, setIsOpen, onClick }) => {
  const router = useRouter();
  const { authenticated, logout, user } = useAuthContext();
  const pathname = usePathname();

  const MenuLinks = [
    {
      id: 1,
      label: "Home",
      path: "/",
    },
    {
      id: 2,
      label: "Notifications",
      path: "",
    },
    {
      id: 3,
      label: "Bookings",
      path: "",
    },
    {
      id: 6,
      label: "Hotels",
      path: "/nomad-dashboard/hotels-list",
    },
    {
      id: 7,
      label: "Messages",
      path: "",
    },
    {
      id: 8,
      label: "Settings",
      path: "",
      children: [
        { id: 4, title: "Profile", path:  `/nomad/profile/${user?.id}` },
        { id: 5, title: "Terms", path: "" },
        { id: 5, title: "Privacy", path: "" },
      ],
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  const handleDropdownToggle = (menuTitle) => {
    setIsDropdownOpen((prev) => (prev === menuTitle ? null : menuTitle));
  };

  useEffect(() => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(null);
    }
  }, [pathname]);

  const isActive = (path) => pathname === path;

  return (
    <Drawer isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen}>
      <div className="flex justify-between items-center">
        <Typography
          variant="h3"
          className="!text-3xl md:!text-4xl font-bold text-primary text-start"
        >
          Hotelbuuk
        </Typography>

        <BgIcon
          iconName="charm:cross"
          onClick={onClick}
          className="bg-primary !text-white"
          iconClass="!text-white size-8"
        />
      </div>

      <div className="flex flex-col h-96 justify-center sm:justify-start  items-center sm:items-start gap-5 mt-10 w-full">
        {MenuLinks?.map((item) => (
          <div key={item.id} className=" w-full">
            <Link
              href={item?.path || "#"}
              onClick={() => handleDropdownToggle(item.label)}
              className={`flex justify-between items-center  hover:bg-[#fef5fc]  rounded-md  !w-[100%] cursor-pointer rounded-10rd h-10 px-4 leading-none ${
                isActive(item?.path)
                  ? "bg-[#feccf4] shadow-custom-shadow"
                  : "hover:bg-[#feccf4]"
              }`}
            >
              <span className="text-lg">{item?.label}</span>
              {item.children && (
                <Iconify
                  iconName="iconamoon:arrow-right-2"
                  className={`transition-all duration-300 text-black  size-7 ${
                    isDropdownOpen === item.label ? "rotate-90" : ""
                  }`}
                />
              )}
            </Link>

            {/* Dropdown children */}
            {item.children && (
              <div
                ref={dropdownRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight:
                    isDropdownOpen === item.label
                      ? `${dropdownRef.current?.scrollHeight}px`
                      : "0px",
                }}
              >
                <div className="mt-3 space-y-2 w-full">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.path}
                      className={`flex justify-between items-center  ${
                        isActive(child?.path)
                          ? "bg-[#feccf4] hover:bg-[#feccf4] "
                          : "hover:bg-[#fef5fc]"
                      } rounded-md   !w-[100%] cursor-pointer rounded-10rd h-10 px-4 leading-none ${
                        isActive(child?.path)
                          ? "bg-[#feccf4] shadow-custom-shadow"
                          : "hover:bg-[#feccf4]"
                      }`}
                    >
                      <span className="text-lg pl-4">{child.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {authenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          AuthLinks?.map((item) => (
            <AnchorTag
              key={item?.id}
              href={item?.path}
              className={`!text-lg ${
                isActive(item?.path)
                  ? "!text-primary underline"
                  : "!text-black hover:!text-primary"
              }`}
            >
              {item?.label}
            </AnchorTag>
          ))
        )}
      </div>
    </Drawer>
  );
};

export const MenuLinks = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "Notifications",
    path: "",
  },
  {
    id: 3,
    label: "Bookings",
    path: "",
  },
  {
    id: 6,
    label: "Hotels",
    path: "",
    children: [
      { id: 1, title: "Hotels List", path: paths.nomadDashboard.hotels },
    ],
  },
  {
    id: 7,
    label: "Messages",
    path: "",
  },
  {
    id: 8,
    label: "Settings",
    path: "",
    children: [
      { id: 4, title: "Profile", path: "" },
      { id: 5, title: "Terms", path: "" },
      { id: 5, title: "Privacy", path: "" },
    ],
  },
];
