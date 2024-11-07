"use client";
import React, { useState } from "react";
import { Button, Iconify, LocationInput, Typography } from "../components";
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
import { RHFLocationSelect } from "../components/hook-form/rhf-location-select";

export const Booking = React.memo(() => {
  const router = useRouter();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Set initial dates for the picker UI
  const initialStartDate = new Date();
  const initialEndDate = addDays(new Date(), 1);

  const [date, setDate] = useState([
    {
      startDate: initialStartDate,
      endDate: initialEndDate,
      key: "selection",
    },
  ]);

  // Track if dates are actively selected
  const [isDateSelected, setIsDateSelected] = useState(false);

  const bookingSchema = Yup.object().shape({
    destination: Yup.string().optional(),
    startDate: Yup.date().optional("Check-in date is optional"),
    endDate: Yup.date().nullable().optional("Check-out date is required"),
  });

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      destination: "",
      startDate: initialStartDate,
      endDate: initialEndDate,
    },
  });

  const handleSubmit = async (data) => {
    const queryParams = new URLSearchParams();

    if (data.destination) {
      queryParams.set("destination", data.destination);
    }

    // Add dates to queryParams only if user has selected them
    if (isDateSelected && data.startDate) {
      queryParams.set("check_in", data.startDate.toString().slice(0,15));
    }
    if (isDateSelected && data.endDate) {
      queryParams.set("check_out", data.endDate.toString().slice(0,15));
    }

    // Construct the redirect URL based on query params
    const queryString = queryParams.toString();
    const redirectUrl = queryString ? `/hotels?${queryString}` : "/hotels";
    router.push(redirectUrl);

    // Reset form and selection tracking
    methods.reset();
    setIsDateSelected(false);
  };

  // const handleSubmit = async (data) => {
  //   console.log("Form data:", data); // Debugging

  //   const queryParams = new URLSearchParams({
  //     destination: data.destination || "",
  //     check_in: data.startDate.toString().slice(0, 15) || "",
  //     check_out: data.endDate.toString().slice(0, 15) || "",
  //   }).toString();

  //   console.log("Redirecting to:", `/hotels?${queryParams}`); // Debugging
  //   router.push(`/hotels?${queryParams}`);
  //   methods.reset();
  // };

  // const handleSubmit = async (data) => {
  //   const queryParams = new URLSearchParams();

  //   // Conditionally add destination if provided
  //   if (data.destination) {
  //     queryParams.set("destination", data.destination);
  //   }

  //   // Add check_in only if the selected date is different from initialStartDate
  //   const startDateChanged =
  //     data.startDate && data.startDate.getTime() !== initialStartDate.getTime();
  //   if (startDateChanged) {
  //     queryParams.set("check_in", data.startDate.toISOString().split("T")[0]);
  //   }

  //   // Add check_out only if the selected date is different from initialEndDate
  //   const endDateChanged =
  //     data.endDate && data.endDate.getTime() !== initialEndDate.getTime();
  //   if (endDateChanged) {
  //     queryParams.set("check_out", data.endDate.toISOString().split("T")[0]);
  //   }

  //   // Redirect only with populated query parameters
  //   const queryString = queryParams.toString();
  //   const redirectUrl = queryString ? `/hotels?${queryString}` : "/hotels";
  //   router.push(redirectUrl);

  //   // Reset the form after submission
  //   methods.reset();
  // };

  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  const handleChange = (details) => {
    methods.setValue("destination", details.formatted_address);
  };

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
            {/* <RHFInput
              type="text"
              placeholder="Moxy Dortmunt City"
              name="destination"
              inputClass="outline-none border-none text-base font-normal !p-0 bg-transparent"
              className="outline-none border-none !p-0 h-8 ml-1"
            /> */}

            <LocationInput
              placeholder="Moxy Dortmunt City"
              name="destination"
              inputClass="outline-none border-none text-base font-normal !p-0 bg-transparent"
              className="outline-none border-none !p-0 h-8 ml-1"
              onChange={(details) => handleChange(details)}
            />
          </div>

          <span className="hidden md:flex h-16 w-[2px] bg-primary" />

          {/* Calendar Input */}
          <div className=" w-full  ">
            <Popover>
              <PopoverTrigger>
                <BookingCalender
                  InputBoxClass=" w-full "
                  startEndBox=" !flex w-full  !flex-row"
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
                    setIsDateSelected(true); // Mark that a date was selected
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
