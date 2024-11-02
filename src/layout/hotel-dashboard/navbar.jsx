"use client";
import React, { useEffect, useState } from "react";

import { useBoolean } from "@/src/hooks";

import {
  AnchorTag,
  Iconify,
  ProfileAvatar,
  Typography,
} from "@/src/components";
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
        "w-full flex justify-between items-center gap-1 py-5 absolute top-0 z-50 px-2 sm:px-8 lg:px-14 xl:px-10 ",
        className
      )}
    >
      <AnchorTag href={"/"}>
        <div className=" flex gap-3 items-center">
          <img
            src="/assets/images/transperent-logo/transperent/WHITE.png"
            className="w-12"
          />
          <Typography
            variant="h3"
            className="sm:!text-xl md:flex hidden md:!text-[1.6rem] !text-[14px] font-bold text-white text-start text-nowrap"
          >
            Hotelbuuk Dashboard
          </Typography>
        </div>
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
          className="flex items-center gap-1 sm:gap-3 lg:gap-2 border border-white rounded-full px-3 md:px-2 py-1 sm:px-7 sm:py-1 cursor-pointer hover:bg-black hover:bg-opacity-20"
        >
          <Iconify
            iconName="material-symbols:menu"
            className="size-5 sm:size-7"
          />
          <span className="flex items-center gap-1">
            {user?.hotel_name && (
              <Typography
                variant="p"
                className="hidden md:block font-medium !text-xs text-white text-nowrap"
              >
                {`Hi, ${user?.hotel_name}`}
              </Typography>
            )}
            {user?.profile_img ? (
              <ProfileAvatar
                src={user?.profile_img}
                type={"server"}
                effect="blur"
                alt={user?.hotel_name}
                className="w-7 h-7 md:w-7 md:h-7  object-cover rounded-full"
              />
            ) : (
              <Iconify
                iconName="carbon:user-avatar-filled"
                className="!size-8 md:!size-8 text-white"
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
});
