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

export const GuestDashboardMenu = ({ isOpen, setIsOpen, onClick }) => {
  const router = useRouter();
  const { authenticated, logout, user } = useAuthContext();
  const pathname = usePathname();

  const UserId = user?.id;

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

      <div className="flex flex-col h-full justify-center sm:justify-start items-center sm:items-start overflow-y-scroll hide-scrollbar gap-5 mt-10 w-full pb-12">
        {MenuLinks(UserId)?.map((item) => (
          <div key={item.id} className="w-full">
            <Link
              href={item?.path || "#"}
              onClick={() => {
                handleDropdownToggle(item.label);
                if (item?.path) {
                  onClick();
                }
              }}
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
                      onClick={onClick}
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

        {authenticated ? (
          <Button className="mb-12" onClick={handleLogout}>
            Logout
          </Button>
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

export const MenuLinks = (UserId) => {
  return [
    {
      id: 1,
      label: "Home",
      path: paths.guestDashboard.root,
    },
    {
      id: 2,
      label: "Notifications",
      path: paths.guestDashboard.notifications,
    },
    {
      id: 3,
      label: "Bookings",
      path: paths.guestDashboard.bookings,
    },
    {
      id: 4,
      label: "Hotels",
      path: paths.guestDashboard.hotels,
    },
    {
      id: 5,
      label: "Nomads",
      path: paths.guestDashboard.nomads,
    },
    {
      id: 6,
      label: "Messages",
      path: paths.chats.root,
    },
    {
      id: 7,
      label: "Settings",
      path: "",
      children: [
        {
          id: 1,
          title: "Profile",
          path: `/profile/${UserId}`,
        },
        { id: 2, title: "Terms", path: "" },
        { id: 3, title: "Privacy", path: "" },
      ],
    },
  ];
};
