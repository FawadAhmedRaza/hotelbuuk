"use client";
import React, { useState } from "react";

// COmponents and Others..
import { Iconify } from "./iconify";
import { Typography } from "./typography";
import { cn } from "@/src/libs/cn";

export const Input = React.memo(
  ({
    label,
    placeholder,
    disabled = false,
    className,
    startIcon,
    startIconClass,
    inputClass,
    customInputClass,
    endIconClass,
    endIcon,
    readOnly = false,
    type = "text",
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const isPasswordField = type === "password";

    return (
      <div
        className={cn(
          " relative flex flex-col gap-1 w-full",
          className,
          disabled && "cursor-not-allowed"
        )}
      >
        {label && (
          <Typography
            variant={"p"}
            className={cn(
              "text-custom-black !text-sm bg-white absolute -top-2.5  left-3",
              disabled ? "opacity-50" : ""
            )}
          >
            {label}
          </Typography>
        )}

        <div
          className={cn(
            "flex items-center rounded bg-white h-12 px-2 gap-2 border border-custom-neutral",
            inputClass,
            disabled ? "!bg-gray-100 cursor-not-allowed" : ""
          )}
        >
          {startIcon ? (
            <Iconify
              iconName={startIcon}
              className={`${startIconClass} !w-5 !h-5`}
            />
          ) : null}

          <input
            type={isPasswordField && showPassword ? "text" : type}
            readOnly={readOnly}
            autoComplete="off"
            placeholder={placeholder}
            className={cn(
              "w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300  text-secondary bg-transparent",
              customInputClass,
              disabled ? " pointer-events-none  " : ""
            )}
          />

          {isPasswordField && (
            <Iconify
              iconName={
                showPassword ? "ic:round-visibility" : "ic:round-visibility-off"
              }
              className={`cursor-pointer text-black        ${endIconClass}`}
              onClick={togglePasswordVisibility}
            />
          )}
          {endIcon ? (
            <Iconify iconName={endIcon} className={` ${endIconClass}`} />
          ) : null}
        </div>
      </div>
    );
  }
);
