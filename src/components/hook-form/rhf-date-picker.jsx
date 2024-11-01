"use client";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { Controller, useFormContext } from "react-hook-form";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const RHFDatePicker = ({ name, onChange, value, rangeColors }) => {
  const { control } = useFormContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 930);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <DateRange
          onChange={onChange}
          months={2}
          ranges={value}
          direction={isMobile ? "vertical" : "horizontal"}
          rangeColors={rangeColors}
          className="w-fit z-20"
          calendarWrapper="mb-10 "
        />
      )}
    />
  );
};
