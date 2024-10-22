"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Iconify } from "../iconify";
import { Typography } from "../typography";
import { cn } from "@/src/libs/cn";
import get from "lodash/get"; 

export const RHFCalendarInput = React.memo(
  ({
    name,
    label,
    disabled = false,
    startIcon,
    startIconClass,
    endIconClass,
    endIcon,
    variant = "medium",
    className,
    inputClass,
    ...rests
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const startDate = value?.startDate || "00-00-000";
          const endDate = value?.endDate || "00-00-000";
          return (
            <div
              className={cn(
                "relative flex flex-col gap-1 w-full cursor-pointer",
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
                <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6">
                  <span className="flex items-center gap-2">
                    <Typography
                      variant="p"
                      className={cn(
                        "font-medium",
                        variant === "small" && "!text-15fs"
                      )}
                    >
                      From :
                    </Typography>
                    <Typography
                      variant="p"
                      className={cn(
                        "text-custom-neutral",
                        variant === "small" && "!text-sm"
                      )}
                    >
                      {startDate}
                    </Typography>
                  </span>
                  <span className="flex items-center gap-2">
                    <Typography
                      variant="p"
                      className={cn(
                        "font-medium",
                        variant === "small" && "!text-15fs"
                      )}
                    >
                      To :
                    </Typography>
                    <Typography
                      variant="p"
                      className={cn(
                        "text-custom-neutral",
                        variant === "small" && "!text-sm"
                      )}
                    >
                      {endDate}
                    </Typography>
                  </span>
                </div>

                {endIcon && (
                  <Iconify iconName={endIcon} className={endIconClass} />
                )}
              </div>

              {errors && (
                <Typography
                  variant="p"
                  className="!text-xs text-red-400 transition-all duration-500"
                >
                  {get(errors, name)?.message}
                </Typography>
              )}
            </div>
          );
        }}
      />
    );
  }
);
