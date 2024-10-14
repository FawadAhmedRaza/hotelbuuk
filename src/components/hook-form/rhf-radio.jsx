"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export const RHFRadio = React.memo(
  ({ id, label, name, disabled = false, className = "", defaultChecked }) => {
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
              defaultChecked={defaultChecked}
              disabled={disabled}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="size-5 border border-secondary  accent-primary   transition-colors duration-200 cursor-pointer"
              id={id}
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
