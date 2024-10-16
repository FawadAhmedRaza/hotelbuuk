"use client";
import React from "react";

// Components and Others..
import { AnchorTag, Iconify, Typography } from "../components";
import { LangaugeTranslator } from ".";
import { useBoolean } from "../hooks/use-boolean";
import { Menu } from "./menu";
import { cn } from "../libs/cn";
import { useAuthContext } from "../auth/jwt/auth-context";

export const NavBar = React.memo(({ className }) => {
  const { user } = useAuthContext();

  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();

  console.log(user);

  return (
    <div
      className={cn(
        "w-full flex justify-between items-center gap-1 py-5 absolute top-0 z-20 px-2 sm:px-8 lg:px-14 xl:px-20 ",
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

        <div
          onClick={toggleDrawer}
          className="flex items-center gap-1 sm:gap-5 border border-white rounded-lg px-2 py-1 sm:px-4 sm:py-2 cursor-pointer hover:bg-black hover:bg-opacity-20"
        >
          <Iconify
            iconName="material-symbols:menu"
            className="size-5 sm:size-8"
          />
          <span className="flex items-center gap-1">
            <Iconify
              iconName="fluent:person-circle-12-filled"
              className="size-5 sm:size-8"
            />
            <Typography
              variant="p"
              className=" font-medium !text-xs text-white text-nowrap"
            >
              Hi, Fawad
            </Typography>
          </span>
        </div>
      </div>
    </div>
  );
});
