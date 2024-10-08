import React from "react";
import { cn } from "../libs/cn";
import { Iconify } from "../components/iconify";
import { Icon } from "@iconify/react";

export const ImgButton = ({ className, src, iconName }) => {
  return (
    <div
      className={cn(
        " flex items-center justify-center gap-3 px-8 h-12  border border-primary text-base text-center rounded-lg w-full  text-nowrap cursor-pointer",
        className
      )}
    >
      {iconName ? (
        <Iconify iconName={iconName} className="text-black"/>
      ) : (
        <img src={src} alt="img" className="w-8 h-auto" />
      )}
    </div>
  );
};
