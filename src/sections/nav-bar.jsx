"use client";
import React from "react";

// Components and Others..
import { AnchorTag, Iconify, Typography } from "../components";
import { LangaugeTranslator } from ".";
import { useBoolean } from "../hooks/use-boolean";
import { Menu } from "./menu";
import { cn } from "../libs/cn";
import { useAuthContext } from "../providers/auth/context/auth-context";

export const NavBar = React.memo(({ className }) => {
  const { user } = useAuthContext();

  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();

  return (
    <div
      className={cn(
        "w-full flex justify-between items-center gap-1 py-4 absolute top-0 z-[999] px-2 sm:px-8 lg:px-14 xl:px-12  bg-white",
        className
      )}
    >
      <AnchorTag
        href={"/"}
        className="flex hover:no-underline items-center gap-2"
      >
        <img
          src="/assets/images/transperent-logo/transperent/PINK.png"
          className="w-12"
        />
        <Typography
          variant="h3"
          className=" !text-md sm:!text-3xl md:!text-3xl font-semibold !text-primary text-start font-poppins  "
        >
          Hotelbuuk
        </Typography>
      </AnchorTag>

      {isOpen && (
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} onClick={toggleDrawer} />
      )}
      <div className="flex gap-2 sm:gap-5">
        {/* language  */}
        <LangaugeTranslator />
        {/* Login  */}
        <div
          onClick={toggleDrawer}
          className="flex items-center gap-1 sm:gap-5  rounded-full px-2 py-1 sm:px-4 sm:py-1 border border-gray-600 cursor-pointer hover:bg-gray-100 "
        >
          <Iconify
            iconName="mynaui:menu"
            className="size-5 sm:size-8 text-gray-600"
          />
          <span className="flex items-center gap-1">
            <Iconify
              iconName="fluent:person-circle-12-filled"
              className="size-5 sm:size-8 text-gray-600"
            />
            <Typography
              variant="p"
              className=" font-medium !text-xs text-gray-600 text-nowrap"
            >
              {user ? user?.first_name : ""}
            </Typography>
          </span>
        </div>
      </div>
    </div>
  );
});
