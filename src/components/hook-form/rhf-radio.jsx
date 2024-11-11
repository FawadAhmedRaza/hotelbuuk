"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Typography } from "../typography";

export const RHFRadio = React.memo(
  ({
    id,
    label,
    name,
    value,
    disabled = false,
    className = "",
    placeholder,
  }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, formState: { errors } }) => {
          const parentFieldName = name.split(".")[0];
          const childFieldName = name.split(".")[1];

          const errorMessage =
            errors?.[parentFieldName]?.[childFieldName]?.message;

          return (
            <div className="flex flex-col gap-2">
              <div className={`flex items-center gap-2 ${className}`}>
                <input
                  {...field}
                  type="radio"
                  id={id}
                  value={value}
                  placeholder={placeholder}
                  disabled={disabled}
                  checked={field.value === value} // Ensure correct selection
                  onChange={() => field.onChange(value)} // Pass the correct value on change
                  className="size-5 border border-secondary accent-black transition-colors duration-200 cursor-pointer"
                />
                <label
                  className="text-15fs text-custom-black cursor-pointer select-none font-montserrat font-medium"
                  htmlFor={id}
                >
                  {label}
                </label>
              </div>
              {errorMessage && (
                <Typography
                  variant={"p"}
                  className="!text-xs text-red-400 transition-all duration-500"
                >
                  {errorMessage}
                </Typography>
              )}
            </div>
          );
        }}
      />
    );
  }
);
