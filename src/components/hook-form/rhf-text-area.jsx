import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Typography } from "../typography";
import { cn } from "@/src/libs/cn";

export const RHFTextArea = ({
  label,
  name,
  placeholder,
  className,
  onChange,
  required = false,
  rows = 5,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <div className={cn(" relative flex flex-col gap-1 w-full", className)}>
          {label && (
            <Typography
              variant={"p"}
              className={`text-custom-black !text-sm bg-white absolute -top-2.5  left-3 `}
            >
              {label}
            </Typography>
          )}
          <textarea
            name={name}
            value={field.value || ""}
            {...field}
            placeholder={placeholder}
            rows={rows}
            required={required}
            onChange={(e) => {
              field.onChange(e); // Call react-hook-form's onChange
              onChange?.(e); // Optionally call the custom onChange if provided
            }}
            className="w-full border bg-white text-sm py-2 px-4  rounded-md outline-none border-custom-neutral placeholder:text-neutral-300  text-secondary  resize-none"
          />
          {errors && (
            <Typography
              variant={"p"}
              className="!text-xs text-red-400 transition-all duration-500"
            >
              {errors?.[name.split(".")[0]]?.[name.split(".")[1]]?.message}
            </Typography>
          )}
        </div>
      )}
    />
  );
};
