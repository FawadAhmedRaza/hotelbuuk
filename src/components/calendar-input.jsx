"use client";
import React from "react";

import { Iconify } from "./iconify";
import { Typography } from "./typography";
import { cn } from "@/src/libs/cn";

export const CalendarInput = React.memo(
  ({
    label,
    disabled = false,
    startDate = "00-00-000",
    endDate = "00-00-000",
    className,
    startIcon,
    startIconClass,
    inputClass,
    endIconClass,
    endIcon,
    ...rests
  }) => {
    return (
      <div
        className={cn(
          "relative flex flex-col gap-1 cursor-pointer",
          className,
          disabled && "cursor-not-allowed"
        )}
        {...rests}
      >
        {label && (
          <Typography
            variant="p"
            className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            {label}
          </Typography>
        )}
        <div
          className={cn(
            "flex items-center rounded bg-white h-12 px-4 gap-2 border border-custom-neutral ",
            inputClass,
            disabled && "!bg-gray-100 cursor-not-allowed"
          )}
        >
          {startIcon && (
            <Iconify
              iconName={startIcon}
              className={`${startIconClass} !w-5 !h-5`}
            />
          )}
          <div className="flex items-center  gap-2.5 sm:gap-4 md:gap-6">
            <span className="flex items-center gap-2 flex-nowrap">
              <Typography variant="p" className="font-medium text-nowrap">
                From :
              </Typography>
              <Typography variant="p" className="!text-sm text-nowrap">
                {startDate}
              </Typography>
            </span>
            <span className="flex items-center gap-2 flex-nowrap">
              <Typography variant="p" className="font-medium text-nowrap">
                To :
              </Typography>
              <Typography variant="p" className="!text-sm text-nowrap">
                {endDate}
              </Typography>
            </span>
          </div>

          {endIcon && <Iconify iconName={endIcon} className={endIconClass} />}
        </div>
      </div>
    );
  }
);
