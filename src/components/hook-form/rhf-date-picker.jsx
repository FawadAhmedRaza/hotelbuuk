import React from "react";
import { useForm, Controller } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";

export const RHFDatePicker = () => {
  const { control, watch } = useForm({
    defaultValues: {
      dateRange: { startDate: null, endDate: null },
    },
  });

  // To observe changes (optional)
  const selectedDate = watch("dateRange");
  console.log("Selected Date Range:", selectedDate);

  return (
    <Controller
      name="dateRange"
      control={control}
      render={({ field }) => (
        <Datepicker
          value={field.value}
          onChange={(newValue) => field.onChange(newValue)}
          showShortcuts={true}
          inputClassName="w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300 text-secondary bg-white"
        />
      )}
    />
  );
};
