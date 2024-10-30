"use client";
import { AnchorTag, Iconify, Typography } from "@/src/components";
import { useBoolean } from "@/src/hooks";
import React from "react";
import { Menu } from "../menu";
import { LangaugeTranslator } from "..";
import { cn } from "@/src/libs/cn";

// Components and Others..

export const HotelNavbar = React.memo(({ className }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();

  return (
    <div
      className={cn(
        "w-full flex justify-between items-center gap-1 py-5 absolute top-0 bg-red-100 z-20 px-2 sm:px-8 lg:px-14 xl:px-20 ",
        className
      )}
    >
      <AnchorTag href={"/"}>
        <Typography
          variant="h3"
          className=" !text-xl sm:!text-3xl md:!text-4xl font-bold text-white text-start  "
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

        <div className="flex items-center gap-1 sm:gap-5 border border-white rounded-lg px-2 py-1 sm:px-4 sm:py-2 cursor-pointer hover:bg-black hover:bg-opacity-20">
          <Iconify
            iconName="material-symbols:menu"
            className="size-5 sm:size-8"
          />
          <span className="flex items-center gap-1">
            <Typography
              variant="p"
              className=" font-medium !text-xs text-white text-nowrap"
            >
              {user ? user.first_name : "Moven pick hotel"}
              {/* Fawad */}
            </Typography>
          </span>
        </div>
      </div>
    </div>
  );
});
