"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Iconify } from "../iconify";
import { Typography } from "../typography";
import { cn } from "@/src/libs/cn";
import { useState } from "react";
import get from "lodash/get";

export const RHFInput = React.memo(
  ({
    label,
    name,
    placeholder,
    disabled = false,
    className,
    startIcon,
    startIconClass,
    inputClass,
    customInputClass,
    endIconClass,
    endIcon,
    onChange,
    readOnly = false,
    type = "text",
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const isPasswordField = type === "password";

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={cn(
              "relative flex flex-col gap-1 w-full",
              className,
              disabled && "cursor-not-allowed"
            )}
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
                "flex items-center rounded bg-white h-12 px-2 gap-2 border border-custom-neutral",
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

              <input
                type={isPasswordField && showPassword ? "text" : type}
                {...field}
                value={field.value || ""}
                readOnly={readOnly}
                autoComplete="off"
                onChange={(e) => {
                  field.onChange(e); // Call react-hook-form's onChange
                  onChange?.(e); // Optionally call the custom onChange if provided
                }}
                placeholder={placeholder}
                className={`w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300 text-secondary bg-transparent ${customInputClass} ${className} ${
                  disabled ? "pointer-events-none" : ""
                }`}
              />

              {isPasswordField && (
                <Iconify
                  iconName={
                    showPassword
                      ? "ic:round-visibility"
                      : "ic:round-visibility-off"
                  }
                  className={`cursor-pointer text-black ${endIconClass}`}
                  onClick={togglePasswordVisibility}
                />
              )}

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
        )}
      />
    );
  }
);
