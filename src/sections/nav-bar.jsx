"use client";
import React from "react";

// Components and Others..
import { AnchorTag, Iconify, Typography } from "../components";
import { LangaugeTranslator } from ".";
import { useBoolean } from "../hooks/use=boolean";
import { Menu } from "./menu";
import { cn } from "../libs/cn";
import { useAuthContext } from "../auth/jwt/auth-context";

export const NavBar = React.memo(({ className, isLogo }) => {
  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();
  return (
    <div
      className={cn(
        "w-full flex justify-between items-center gap-5 py-5 absolute top-0 z-20 px-5 sm:px-8",
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

      {isOpen && <Menu isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className="flex gap-2 sm:gap-5">
        {/* language  */}
        <LangaugeTranslator />
        {/* Login  */}

        <div
          className="flex items-center gap-2 sm:gap-5 border border-white rounded-lg px-2 py-1 sm:px-4 sm:py-2 cursor-pointer hover:bg-black hover:bg-opacity-20"
          onClick={toggleDrawer}
        >
          <Iconify
            iconName="material-symbols:menu"
            className="size-6 sm:size-8"
          />
          <Iconify
            iconName="fluent:person-circle-12-filled"
            className="size-6 sm:size-8"
          />
        </div>
      </div>
    </div>
  );
});
