"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export const RHFCheckbox = React.memo(
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
              type="checkbox"
              defaultChecked={defaultChecked}
              disabled={disabled}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-4 w-4 rounded-xl border border-black  accent-primary   transition-colors duration-200"
              id={id}
            />
            <label
              className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
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
