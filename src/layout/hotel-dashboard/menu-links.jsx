"use client";

import { usePathname, useRouter } from "next/navigation";
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

export const HotelDashboardMenu = ({ isOpen, setIsOpen, onClick }) => {
  const router = useRouter();
  const { authenticated, logout, user } = useAuthContext();
  const pathname = usePathname();

  const UserId = user?.id; // Get user ID from context safely

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    router.refresh(); // Refresh after logout
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
    <Drawer
      isDrawerOpen={isOpen}
      setIsDrawerOpen={setIsOpen}
      className="h-auto"
    >
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

      <div className="flex flex-col h-full justify-center sm:justify-start items-center overflow-y-scroll hide-scrollbar sm:items-start gap-5 mt-10 w-full mb-10 pb-12">
        {MenuLinks(UserId)?.map((item) => (
          <div key={item.id} className="w-full">
            <Link
              href={item?.path || "#"}
              onClick={() => handleDropdownToggle(item.label)}
              className={`flex justify-between items-center ${
                isActive(item?.path)
                  ? "bg-tertiary hover:bg-tertiary "
                  : "hover:bg-tertiary"
              } rounded-md !w-[100%] cursor-pointer rounded-10rd h-10 px-4 leading-none ${
                isActive(item?.path)
                  ? "bg-tertiary shadow-custom-shadow"
                  : "hover:bg-tertiary"
              }`}
            >
              <span className="text-lg">{item?.label}</span>
              {item.children && (
                <Iconify
                  iconName="iconamoon:arrow-right-2"
                  className={`transition-all duration-300 text-primary size-7 ${
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
                      className={`flex justify-between items-center hover:bg-[#fef5fc] rounded-md !w-[100%] cursor-pointer rounded-10rd h-10 px-4 leading-none ${
                        isActive(child?.path)
                          ? "bg-[#feccf4]-2 shadow-custom-shadow"
                          : "hover:bg-[#feccf4]-2"
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

        {authenticated && <Button className="mb-10" onClick={handleLogout}>Logout</Button>}
      </div>
    </Drawer>
  );
};

// Helper function to generate menu links with dynamic paths

export const MenuLinks = (UserId) => {
  return [
    {
      id: 1,
      label: "Home",
      path: paths.hotelDashboard.root,
    },
    {
      id: 2,
      label: "Notifications",
      path: "",
    },
    {
      id: 3,
      label: "Bookings",
      path: paths.hotelDashboard.bookings.root,
    },
    {
      id: 4,
      label: "Events",
      path: paths.hotelDashboard.events.root,
    },
    {
      id: 6,
      label: "Nomads",
      // path: paths.hotelDashboard.nomads.root,
      // path: "",
      children: [
        { id: 1, title: "All Nomads", path: paths.hotelDashboard.nomads.root },
        {
          id: 2,
          title: "Internal Nomads",
          path: paths.hotelDashboard.nomads.internalNomads,
        },
      ],
    },
    {
      id: 8,
      label: "Rooms",
      path: paths.hotelDashboard.rooms,
    },
    {
      id: 9,
      label: "Messages",
      path: "",
    },
    {
      id: 10,
      label: "Settings",
      path: "",
      children: [
        {
          id: 1,
          title: "Profile",
          path: `/hotel-info/${UserId}`,
        },
        { id: 2, title: "Terms", path: "" },
        { id: 3, title: "Privacy", path: "" },
      ],
    },
  ];
};
