"use client";

import { useState } from "react";
import { useEffect } from "react";

// Components and Others...
import { hotelRules } from "@/src/_mock/nomad-list";
import { Button, Typography } from "@/src/components";
import { RHFCheckbox, RHFDatePicker } from "@/src/components/hook-form";
import { getFormattedDate } from "@/src/libs/helper";
import { addDays } from "date-fns";
import { useFormContext } from "react-hook-form";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const SetAvailability = () => {
  const { setValue, watch } = useFormContext();
  console.log(watch("availibility"));

  const [openCalender, setOpenCalender] = useState(false);
  const startDate = watch("availibility.start_date");
  const endDate = watch("availibility.end_date");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const toggleCalender = () => {
    setOpenCalender((prev) => !prev);
  };

  const AddCalender = () => {
    setOpenCalender((prev) => !prev);
    setValue("availibility.start_date", date[0].startDate.toString());
    setValue("availibility.end_date", date[0].endDate.toString());
  };

  const cancelCalender = () => {
    setOpenCalender((prev) => !prev);
    setDate(() => [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: "selection",
      },
    ]);
  };

  useEffect(() => {
    const outsideClickHandler = () => {
      if (openCalender) {
        setOpenCalender(false);
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      setDate([
        {
          startDate: startDate,
          endDate: endDate,
          key: "selection",
        },
      ]);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        Availability
      </Typography>
      <div className="flex flex-col gap-3 w-full">
        <Typography variant="h6" className="font-medium">
          B&B Tour Starting and Ending
        </Typography>
      </div>

      <div className="relative">
        <div
          className=" flex border border-primary py-2 px-2 sm:px-5 rounded-lg hover:bg-primay-300 cursor-pointer w-fit"
          onClick={toggleCalender}
        >
          <span className="flex items-start gap-2 sm:gap-4  text-sm sm:text-base text-nowrap">
            From :
            <Typography variant="h6" className="text-nowrap">
              {date[0].startDate.toString().slice(0, 10) || getFormattedDate()}
            </Typography>
            To :
            <Typography variant="h6">
              {date[0].endDate.toString().slice(0, 10) ||
                getFormattedDate(Date())}
            </Typography>
          </span>
        </div>
        {openCalender && (
          <div className={`  mt-5 p-3  bg-gray-200 rounded-lg`}>
            <RHFDatePicker
              name="availibility"
              onChange={(item) => setDate([item.selection])}
              value={date}
              rangeColors={["#852169"]}
            />

            <div className="flex justify-end py-5 gap-5">
              <Button onClick={cancelCalender} className="py-2 px-5">
                Cancel
              </Button>
              <Button onClick={AddCalender} className="py-2 px-5">
                Add
              </Button>
            </div>
          </div>
        )}
      </div>

      <Typography variant="h4" className="font-semibold">
        How Rules
      </Typography>
      <div className="flex flex-col gap-3 w-full">
        <Typography variant="h6" className="font-medium">
          What Rules must your Guest observe?
        </Typography>

        {hotelRules.map((rule) => (
          <RHFCheckbox
            key={rule.ruleId}
            name={`availibility.rules.${rule.name}`}
            label={rule.title}
          />
        ))}
      </div>
    </div>
  );
};
