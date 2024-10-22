"use client";

import React, { useEffect, useState } from "react";

import { useBoolean } from "@/src/hooks";

import { AnchorTag, Iconify, Typography } from "@/src/components";
import { HotelDashboardMenu } from "./menu-links";
import { LangaugeTranslator } from "@/src/sections";
import { cn } from "@/src/libs/cn";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

export const HotelDashboardNavBar = React.memo(({ className }) => {
  const { user } = useAuthContext();
  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();

  console.log("hotel user", user);

  return (
    <div
      className={cn(
        "w-full flex justify-between items-center gap-1 py-5 absolute top-0 z-20 px-2 sm:px-8 lg:px-14 xl:px-10 ",
        className
      )}
    >
      <AnchorTag href={"/"}>
        <Typography
          variant="h3"
          className=" !text-xl sm:!text-3xl md:!text-3xl font-bold text-white text-start  "
        >
          Hotelbuuk Dashboard
        </Typography>
      </AnchorTag>

      {isOpen && (
        <HotelDashboardMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={toggleDrawer}
        />
      )}

      <div className="flex gap-2 sm:gap-5">
        <LangaugeTranslator />

        <div
          onClick={toggleDrawer}
          className="flex items-center gap-1 sm:gap-5 border border-white rounded-lg px-2 py-1 sm:px-4 sm:py-2 cursor-pointer hover:bg-black hover:bg-opacity-20"
        >
          <Iconify
            iconName="material-symbols:menu"
            className="size-5 sm:size-8"
          />
          <span className="flex items-center gap-1">
            <Typography
              variant="p"
              className="font-medium !text-xs text-white text-nowrap"
            >
              Hi, {user ? user?.hotel_name : ""} !{/* Fawad */}
            </Typography>
            <Iconify
              iconName="fluent:person-circle-12-filled"
              className="size-5 sm:size-8"
            />
          </span>
        </div>
      </div>
    </div>
  );
});
