import React from "react";
import { cn } from "../libs/cn";
import { BgIcon } from "./bg-icon";
import { Iconify } from ".";

export const Button = ({
  className,
  children,
  startIcon,
  endIcon,
  type = "button",
  loading = false,
  disabled = false,
  ...rests
}) => {
  return (
    <button
      className={cn(
        `flex items-center justify-center gap-3 px-8 py-2.5 text-white bg-primary  text-base text-center rounded-full w-fit text-nowrap cursor-pointer !font-dmSans  ${
          (loading || disabled) &&
          "opacity-50 !cursor-not-allowed pointer-events-none"
        } `,
        className,
        startIcon && "pl-2",
        endIcon && "pr-2"
      )}
      {...rests}
      type={type}
      disabled={disabled}
    >
      {loading && (
        <Iconify
          iconName="eos-icons:loading"
          className="animate-spin !text-tertiary "
        />
      )}
      {startIcon && <BgIcon iconName={startIcon} iconClass={` text-black `} />}
      {children}
      {endIcon && <BgIcon iconName={endIcon} iconClass={`text-black`} />}
    </button>
  );
};
