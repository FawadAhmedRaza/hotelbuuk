"use client";
import React, { useState } from "react";
import { Button, Iconify, Typography } from "../components";
import * as Yup from "yup";
import {
  RHFFormProvider,
  RHFDatePicker,
  RHFInput,
} from "@/src/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { RHFCalendarInput } from "../components/calendar-input";
// import { RHFCalendarInput } from "../components/RHFCalendarInput";

export const Booking = React.memo(() => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const bookingSchema = Yup.object().shape({
    destination: Yup.string().optional(""),
    startDate: Yup.date().optional("Check-in date is optional"),
    endDate: Yup.date().nullable().optional("Check-out date is required"),
  });

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      destination: "",

      startDate: date[0].startDate,
      endDate: date[0].endDate || "00-00-0000",
    },
  });

  const handleSubmit = async (data) => {
    console.log({
      destination: data.destination,
      check_in: data.startDate ? data.startDate.toString() : "",
      check_out: data.endDate ? data.endDate.toString() : "00-00-0000",
    });
    methods.reset();
  };

  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  return (
    <RHFFormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(handleSubmit)}
      className=""
    >
      <div className="flex items-center !w-fit pl-0 pr-3 py-0 m-0 rounded-full shadow-none md:shadow-xl -mt-3 backdrop-blur-sm bg-white mx-auto">
        <div className="flex   md:flex-row flex-col w-full  gap-3 md:items-center ">
          {/* Destination Input */}
          <div className="py-2 md:pl-5 xl:pl-10 pr-10 md:hover:bg-gray-100 rounded-full">
            <div className="flex gap-3 items-center">
              <Iconify
                iconName="carbon:location-filled"
                className="text-primary mt-1"
              />
              <Typography variant="p" className="font-normal !text-sm">
                Destinations
              </Typography>
            </div>
            <RHFInput
              type="text"
              placeholder="Moxy Dortmunt City"
              name="destination"
              inputClass="outline-none border-none text-base font-normal !p-0 bg-transparent"
              className="outline-none border-none !p-0 h-8 ml-1"
            />
          </div>

          <span className="hidden md:flex h-16 w-[2px] bg-primary" />

          {/* Calendar Input */}
          <div className=" ">
            <Popover>
              <PopoverTrigger>
                <RHFCalendarInput
                  nameStart="startDate"
                  nameEnd="endDate"
                  labelStart="Check-in"
                  labelEnd="Check-out"
                  startIcon="uil:calendar-alt"
                  endIcon="uil:calendar-alt"
                  onOpenPopover={togglePopover}
                />
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <RHFDatePicker
                  name="availability"
                  onChange={(item) => {
                    setDate([item.selection]);
                    methods.setValue("startDate", item.selection.startDate);
                    methods.setValue("endDate", item.selection.endDate);
                  }}
                  value={date}
                  rangeColors={["#852169"]}
                  twoSideCalendar={true}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <Button type="submit" className=" sm:w-fit">
            Search
          </Button>
        </div>
      </div>
    </RHFFormProvider>
  );
});
