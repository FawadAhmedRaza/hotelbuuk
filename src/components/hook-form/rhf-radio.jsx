"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export const RHFRadio = React.memo(
  ({ id, label, name, value, disabled = false, className = "" }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className={`flex items-center gap-2 ${className}`}>
            <input
              {...field}
              type="radio"
              id={id}
              value={value}
              disabled={disabled}
              checked={field.value === value} // Ensure correct selection
              onChange={() => field.onChange(value)} // Pass the correct value on change
              className="size-5 border border-secondary accent-primary transition-colors duration-200 cursor-pointer"
            />
            <label
              className="text-15fs text-custom-black cursor-pointer select-none font-montserrat font-medium"
              htmlFor={id}
            >
              {label}
            </label>
          </div>
        )}
      />
    );
  }
);
