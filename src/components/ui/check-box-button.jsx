"use client";
import React, { useState } from "react";
import { Typography } from "../typography";

export const CheckBoxButton = React.memo(
  ({ id, label, value, disabled = false, className = "", errorMessage }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
      setIsChecked((prev) => !prev);
    };

    return (
      <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="h-4 w-4 rounded border border-gray-300 text-primary focus:ring-primary accent-primary"
      />
      <label className="text-sm text-gray-700">{label}</label>
    </div>
    );
  }
);
