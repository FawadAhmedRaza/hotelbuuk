

"use client";
import React from "react";
import { Typography } from "../typography";
import { StarRating } from "../star-rating";

export const CheckBoxButton = React.memo(
  ({
    id,
    label,
    value,
    isRating = false,
    disabled = false,
    className = "",
    errorMessage,
    onChange,
  }) => {
    return (
      <div className="flex items-center gap-2">
        <label
          className={`flex items-center gap-2 text-sm text-gray-700 ${className}`}
        >
          <input
            type="checkbox"
            onChange={(e) => onChange(e.target.checked)} // Call the onChange prop with the checked state
            className="h-4 w-4 rounded border border-gray-300 text-primary focus:ring-primary accent-primary"
          />
          <span className={`${isRating && "flex items-center gap-2"}`}>
            {label}{" "}
            {isRating && <StarRating className="text-xl" rating={label} />}{" "}
          </span>
        </label>
        {errorMessage && (
          <span className="text-red-500 text-xs">{errorMessage}</span>
        )}
      </div>
    );
  }
);
