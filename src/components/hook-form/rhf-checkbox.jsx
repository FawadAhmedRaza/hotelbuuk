"use client";
import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

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
    const { control } = useFormContext();

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
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
                value={field?.value || false}
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
                className="h-4 w-4 rounded-xl border border-black accent-primary transition-colors duration-200"
              />
              <span className="text-sm text-gray-700 font-montserrat font-medium">
                {label}
              </span>
            </label>
          </div>
        )}
      />
    );
  }
);
