import React from "react";
import { DateRange } from "react-date-range";
import { Controller, useFormContext } from "react-hook-form";

export const RHFDatePicker = ({ onChange, value, rangeColors }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name="dateRange"
      control={control}
      render={() => (
        <DateRange
          onChange={onChange}
          months={2}
          ranges={value}
          direction="horizontal"
          rangeColors={rangeColors}
        />
      )}
    />
  );
};