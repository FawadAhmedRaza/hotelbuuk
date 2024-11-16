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
      path: "/nomad-dashboard",
      icon: "material-symbols:home",
    },
    {
      id: 2,
      label: "Notifications",
      path: paths.nomadDashboard.notifications,
      icon: "mingcute:notification-fill",
    },
    {
      id: 3,
      label: "Bookings",
      path: paths.nomadDashboard.bookings.root,
      icon: "clarity:event-solid",
    },
    {
      id: 4,
      label: "Events",
      path: paths.nomadDashboard.events.root,
      icon: "ic:baseline-event",
    },
    {
      id: 6,
      label: "Hotels",
      path: "/nomad-dashboard/hotels-list",
      icon: "mingcute:hotel-fill",
    },
    {
      id: 7,
      label: "Messages",
      path: paths.chats.root,
      icon: "streamline:mail-send-email-message-solid",
    },
    {
      id: 8,
      label: "Settings",
      icon: "material-symbols:settings",

      children: [
        {
          id: 4,
          title: "Profile",
          path: `/nomad/profile/${user?.id}`,
          icon: "carbon:user-profile",
        },
        {
          id: 5,
          title: "Terms",
          path: paths.terms,
          icon: "fluent-mdl2:entitlement-policy",
        },
        {
          id: 5,
          title: "Privacy",
          path: paths.privacyPolicy,
          icon: "iconoir:privacy-policy",
        },
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
          className="!text-3xl md:!text-4xl font-bold text-black text-start"
        >
          Hotelbuuk
        </Typography>

        <BgIcon
          iconName="charm:cross"
          onClick={onClick}
          className="bg-black !text-white"
          iconClass="!text-white size-8"
        />
      </div>

      <div className="flex flex-col h-full justify-center sm:justify-start  overflow-y-scroll hide-scrollbar items-center sm:items-start gap-5 mt-10 w-full pb-12">
        {MenuLinks?.map((item) => (
          <div key={item.id} className=" w-full">
            <Link
              href={item?.path || "#"}
              onClick={() => {
                handleDropdownToggle(item.label);
                if (item?.path) {
                  onClick();
                }
              }}
              className={`flex justify-between items-center  hover:bg-[#F2F2F2]  rounded-md  !w-[100%] cursor-pointer rounded-10rd h-10 px-4 leading-none ${
                isActive(item?.path)
                  ? "bg-[#F2F2F2] shadow-custom-shadow"
                  : "hover:bg-[#F2F2F2]"
              }`}
            >
              <div className="flex gap-3 items-center">
                <Iconify
                  iconName={item?.icon}
                  className={`!size-5 text-black`}
                />
                <span className="text-lg">{item?.label}</span>
              </div>{" "}
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
                      onClick={onClick}
                      className={`flex justify-between items-center  ${
                        isActive(child?.path)
                          ? "bg-[#F2F2F2] hover:bg-[#F2F2F2] "
                          : "hover:bg-[#F2F2F2]"
                      } rounded-md   !w-[100%] cursor-pointer rounded-10rd h-10 px-4 leading-none ${
                        isActive(child?.path)
                          ? "bg-[#F2F2F2] shadow-custom-shadow"
                          : "hover:bg-[#F2F2F2]"
                      }`}
                    >
                      <div className="flex gap-3 items-center pl-4">
                        <Iconify
                          iconName={child?.icon}
                          className={`!size-5 text-black`}
                        />
                        <span className="text-lg ">{child.title}</span>
                      </div>{" "}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {authenticated && (
          <Button className="mb-12 !bg-black" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export const MenuLinks = [
  {
    id: 1,
    label: "Home",
    path: "/nomad-dashboard",
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
