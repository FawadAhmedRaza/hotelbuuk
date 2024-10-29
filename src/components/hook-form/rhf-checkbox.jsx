"use client";
import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Typography } from "..";
import get from "lodash/get"; // Import lodash's get method

export const RHFCheckbox = React.memo(
  ({
    id,
    label,
    name,
    disabled = false,
    className = "",
    defaultChecked,
    checked,
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    console.log(errors); // Debugging step to check if errors are being passed correctly

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-y-2">
            <div className={`flex items-center gap-2 ${className}`}>
              <label
                htmlFor={id}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  {...field}
                  type="checkbox"
                  id={id}
                  defaultChecked={defaultChecked}
                  disabled={disabled}
                  value={field.value}
                  checked={field.value} // Use field.value directly
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded-xl border border-black accent-primary transition-colors duration-200"
                />
                <span className="text-sm text-gray-700 font-montserrat font-medium">
                  {label}
                </span>
              </label>
            </div>
            {errors && get(errors, name) && (
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
