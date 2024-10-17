import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TimePicker from "react-time-picker";

export const RHFTimePicker = ({ name, onChange, value }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TimePicker
          onChange={onChange || field.onChange}
          value={value || field.value}
          format="hh:mm a" 
          className="w-full"
          disableClock={true}
        />
      )}
    />
  );
};
