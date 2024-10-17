import React from "react";
import { cn } from "../libs/cn";
import { BgIcon } from "./bg-icon";

export const Button = ({
  className,
  children,
  startIcon,
  endIcon,
  type = "button",
  ...rests
}) => {
  return (
    <button
      className={cn(
        " flex items-center justify-center gap-3 px-6 sm:px-8 py-1.5 sm:py-2.5  text-white bg-primary  text-base text-center rounded-full w-fit text-nowrap cursor-pointer ",
        className,
        startIcon && "pl-2",
        endIcon && "pr-2"
      )}
      
      {...rests}
      type={type}
    >
      {startIcon && <BgIcon iconName={startIcon} iconClass={` text-black `} />}
      {children}
      {endIcon && <BgIcon iconName={endIcon} iconClass={`text-black`} />}
    </button>
  );
};
