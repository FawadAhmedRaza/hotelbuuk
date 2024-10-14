"use client";
import React, { forwardRef } from "react";
import { Typography } from "../typography";
import { Iconify } from "../iconify";
import { cn } from "@/src/libs/cn";

// const getFormattedDate = (inputDate) => {
//   const date = new Date(inputDate); // Create a Date object from the input date
//   const options = { weekday: "short", month: "short", day: "2-digit" };
//   return date.toLocaleDateString("en-US", options).replace(",", ""); // Format and return the date
// };

// Custom Date Input Component using forwardRef
export const RHFDateInput = React.memo(
  forwardRef(
    (
      {
        label,
        placeholder = "Select a date",
        className,
        inputClass,
        customInputClass,
        startIcon,
        startIconClass,
        endIcon,
        endIconClass,
        disabled = false,
        onClick, // External onClick function from props
      },
      ref // Forwarded ref to control the input externally
    ) => {
      const getFormattedDate = (date) => {
        const options = { weekday: "short", month: "short", day: "2-digit" };
        return new Date(date)
          .toLocaleDateString("en-US", options)
          .replace(",", "");
      };

      return (
        <div
          className={cn(
            "relative flex flex-col gap-1 w-full",
            className,
            disabled && "cursor-not-allowed"
          )}
        >
          {/* Label */}
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

          <div className="relative">
            {/* Hidden Date Input */}
            <input
              type="date"
              ref={ref} // Use forwarded ref to control the date input
              className="appearance-none rounded-lg px-3 py-2 text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none", // Hidden but accessible
              }}
              onChange={(e) => onClick(e.target.value)} // Call onClick with the selected date
            />

            {/* Custom Wrapper for Display and Icon */}
            <div
              className={`flex items-center justify-between rounded-lg px-3 py-2 
                          cursor-pointer hover:bg-gray-100 ${inputClass} ${
                disabled ? "!bg-gray-100 cursor-not-allowed" : ""
              }`}
              onClick={() => ref.current?.showPicker()} // Trigger date picker
            >
              {/* Start Icon */}
              {startIcon && (
                <Iconify
                  iconName={startIcon}
                  className={`${startIconClass} !w-5 !h-5`}
                />
              )}

              {/* Placeholder or Selected Date */}
              <span
                className={`text-base md:text-lg font-normal ${customInputClass}`}
              >
                {/* {field.value
                  ? getFormattedDate(field.value) // Format date if available
                  : placeholder} */}
                {placeholder}
              </span>

              {/* End Icon */}
              {endIcon && (
                <Iconify iconName={endIcon} className={` ${endIconClass}`} />
              )}
            </div>
          </div>
        </div>
      );
    }
  )
);
