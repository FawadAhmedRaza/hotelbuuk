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
import { addDays } from "date-fns";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { BookingCalender } from "../components/booking-calendar";
import { formatDate } from "../utils/formate-date";
import { useRouter } from "next/navigation";

export const Booking = React.memo(() => {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const bookingSchema = Yup.object().shape({
    destination: Yup.string().required("Destination is required."),
    startDate: Yup.date().optional("Check-in date is optional"),
    endDate: Yup.date().nullable().optional("Check-out date is required"),
  });

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      destination: "",
      startDate: date[0].startDate,
      endDate: date[0].endDate,
    },
  });

  const handleSubmit = async (data) => {
    console.log("Form data:", data); // Debugging

    const queryParams = new URLSearchParams({
      destination: data.destination || "",
      check_in: data.startDate.toString().slice(0, 15) || "",
      check_out: data.endDate.toString().slice(0, 15) || "",
    }).toString();

    console.log("Redirecting to:", `/hotels?${queryParams}`); // Debugging
    router.push(`/hotels?${queryParams}`);
    methods.reset();
  };

  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  return (
    <RHFFormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(handleSubmit)}
      className=" w-full "
    >
      <div className="flex md:items-center !w-fit pl-0 pr-3 py-0 m-0  bg-white    md:rounded-full shadow-none md:shadow-xl -mt-3 backdrop-blur-sm md:mx-auto">
        <div className="flex md:flex-row flex-col gap-3 md:items-center w-full ">
          {/* Destination Input */}
          <div className="py-2 pl-0 md:pl-5 xl:pl-10 pr-4 ms:pr-10  md:rounded-full">
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
              errorClass="  -mt-3  ml-1"
              type="text"
              placeholder="Moxy Dortmunt City"
              customInputClass="md:w-40  w-full"
              name="destination"
              inputClass="outline-none border-none text-base font-normal  !p-0 bg-transparent"
              className="outline-none border-none !p-0 h-8 ml-1"
            />
          </div>

          <span className="hidden md:flex h-16 w-[2px] bg-primary" />

          {/* Calendar Input */}
          <div className=" w-full  ">
            <Popover>
              <PopoverTrigger>
                <BookingCalender
                  InputBoxClass=" w-full   md:px-0 "
                  startEndBox=" !flex w-full  !flex-row  px-0"
                  nameStart="startDate"
                  labelClass=" !font-normal !text-[14px]"
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
          <Button type="submit" className="sm:w-fit md:mt-0 mt-5">
            Search
          </Button>
        </div>
      </div>
    </RHFFormProvider>
  );
});
