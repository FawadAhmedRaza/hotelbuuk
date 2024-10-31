"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Iconify } from "./iconify";
import { Typography } from "./typography";
import { cn } from "@/src/libs/cn";

export const BookingCalender = React.memo(
  ({
    nameStart = "startDate",
    nameEnd = "endDate",
    labelStart = "Check-in",
    labelEnd = "Check-out",
    InputBoxClass,
    startIconClass,
    inputClass,
    endIconClass,
    endIcon,
    onOpenPopover,
    className,
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <div
        className={cn(
          "flex items-center  rounded gap-2  cursor-pointer",
          className
        )}
        onClick={onOpenPopover}
      >
        <div className="flex items-center gap-5  ">
          {/* Start Date */}
          <Controller
            name={nameStart}
            control={control}
            render={({ field }) => (
              <div
                className={`flex flex-col items-start gap-1 py-2 px-5 md:px-10 rounded-full  hover:bg-gray-100 ${InputBoxClass}`}
              >
                <div className="flex gap-3">
                  <Iconify iconName="uil:calender" className="text-primary" />
                  <Typography variant="p" className="text-sm">
                    {labelStart}
                  </Typography>
                </div>
                <input
                  {...field}
                  className={`!text-sm text-gray-900 outline-none bg-transparent ${inputClass}`}
                  readOnly
                />
                {/* {errors[nameStart] && (
                  <Typography variant="p" className="!text-xs text-red-400">
                    {errors[nameStart]?.message}
                  </Typography>
                )} */}
              </div>
            )}
          />

          {/* End Date */}
          <Controller
            name={nameEnd}
            control={control}
            render={({ field }) => (
              <div
                className={`flex flex-col items-start gap-1 py-2 px-5 md:px-10 rounded-full  hover:bg-gray-100 ${InputBoxClass}`}
              >
                <div className="flex gap-3 items-center">
                  <Iconify iconName="uil:calender" className="text-primary" />
                  <Typography variant="p" className="text-sm">
                    {labelEnd}
                  </Typography>
                </div>
                <input
                  {...field}
                  className={`!text-sm text-gray-900 outline-none bg-transparent ${inputClass}`}
                  readOnly
                />
                {/* {errors[nameEnd] && (
                  <Typography variant="p" className="!text-xs text-red-400">
                    {errors[nameEnd]?.message}
                  </Typography>
                )} */}
              </div>
            )}
          />
        </div>
      </div>
    );
  }
);