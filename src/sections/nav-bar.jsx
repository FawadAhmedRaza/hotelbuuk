"use client";
import React from "react";

// Components and Others..
import { Iconify } from "../components";
import { LangaugeTranslator } from ".";
import { useBoolean } from "../hooks/use=boolean";
import { Menu } from "./menu";
import { cn } from "../libs/cn";
import { useAuthContext } from "../auth/jwt/auth-context";

export const NavBar = React.memo(({ className }) => {
  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();
  return (
    <div
      className={cn(
        "w-full flex justify-end items-center gap-5 py-5 absolute top-0 z-20 px-8",
        className
      )}
    >
      {isOpen && <Menu isOpen={isOpen} setIsOpen={setIsOpen} />}

      {/* language  */}
      <LangaugeTranslator />
      {/* Login  */}

      <div
        className="flex items-center gap-5 border border-white rounded-lg px-4 py-2 cursor-pointer hover:bg-black hover:bg-opacity-20"
        onClick={toggleDrawer}
      >
        <Iconify iconName="material-symbols:menu" className="size-8" />
        <Iconify iconName="fluent:person-circle-12-filled" className="size-8" />
      </div>
    </div>
  );
});
