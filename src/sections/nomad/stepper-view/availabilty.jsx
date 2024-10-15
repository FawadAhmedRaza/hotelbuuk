"use client";

import { useEffect } from "react";

// Components and Others...
import { hotelRules } from "@/src/_mock/nomad-list";
import { Button, Typography } from "@/src/components";
import { RHFCheckbox, RHFDatePicker } from "@/src/components/hook-form";
import { getFormattedDate } from "@/src/libs/helper";
import { addDays } from "date-fns";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export const SetAvailability = () => {
  const [openCalender, setOpenCalender] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const toggleCalender = () => {
    setOpenCalender((prev) => !prev);
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
          className=" flex border border-primary py-2 px-5 rounded-lg hover:bg-primay-300 cursor-pointer "
          onClick={toggleCalender}
        >
          <span className="flex items-start gap-4 text-base">
            From :
            <Typography variant="h6">
              {" "}
              {date[0].startDate.toString().slice(0, 10) ||
                getFormattedDate()}{" "}
            </Typography>
            To :
            <Typography variant="h6">
              {" "}
              {date[0].endDate.toString().slice(0, 10) ||
                getFormattedDate()}{" "}
            </Typography>
          </span>
        </div>

        <div
          className={`absolute ${
            !openCalender ? "hidden" : "block"
          } top-14 p-3  bg-gray-200 rounded-lg`}
        >
          <RHFDatePicker
            onChange={(item) => {
              console.log("item", item);
              setDate([item.selection]);
            }}
            value={date}
            rangeColors={["#852169"]}
          />

          <div className="flex justify-end py-5 gap-5">
            <Button onClick={toggleCalender} className="py-2 px-5">
              Cancel
            </Button>
            <Button onClick={toggleCalender} className="py-2 px-5">
              Add
            </Button>
          </div>
        </div>
      </div>

      <Typography variant="h4" className="font-semibold">
        How Rules
      </Typography>
      <div className="flex flex-col gap-3 w-full">
        <Typography variant="h6" className="font-medium">
          What Rules must your Guest observe?
        </Typography>

        {hotelRules.map((rule, index) => (
          <RHFCheckbox key={index} name={rule.name} label={rule.title} />
        ))}
      </div>
      <div className="flex justify-end items-end w-full">
        <Button>Add</Button>
      </div>
    </div>
  );
};
