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
    labelClass,
    startEndBox,
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
          "flex  w-full  rounded gap-0  cursor-pointer ",
          className
        )}
        onClick={onOpenPopover}
      >
        <div
          className={`flex sm:items-center w-full sm:flex-row flex-col gap-1 sm:gap-5 ${startEndBox}`}
        >
          {/* Start Date */}
          <Controller
            name={nameStart}
            control={control}
            render={({ field }) => {

              return (
                <div
                  className={`flex flex-col items-start gap-1 py-0 px-0  w-full md:px-5    ${InputBoxClass}`}
                >
                  <div className="flex gap-3">
                    <Iconify iconName="uil:calender" className="text-primary" />
                    <Typography variant="p" className={`text-sm ${labelClass}`}>
                      {labelStart}
                    </Typography>
                  </div>
                  <input
                    {...field}
                    value={field.value?.toString().slice(0, 10)  } 
                    className={`!text-sm text-gray-900 outline-none bg-transparent ${inputClass}`}
                    readOnly
                  />
                  {/* {errors[nameStart] && (
                  <Typography variant="p" className="!text-xs text-red-400">
                    {errors[nameStart]?.message}
                  </Typography>
                )} */}
                </div>
              );
            }}
          />

          {/* End Date */}
          <Controller
            name={nameEnd}
            control={control}
            render={({ field }) => (
              <div
                className={`flex flex-col items-start gap-1  py-0 w-full px-0 sm:px-5 md:px-5     ${InputBoxClass}`}
              >
                <div className="flex gap-3 items-center">
                  <Iconify iconName="uil:calender" className="text-primary" />
                  <Typography variant="p" className={`text-sm ${labelClass}`}>
                    {labelEnd}
                  </Typography>
                </div>
                <input
                  {...field}
                  value={field.value?.toString().slice(0, 10)}
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
