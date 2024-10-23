"use client";

import React, { useRef } from "react";
import { Button, Iconify, Typography } from "../components";
import * as Yup from "yup";
import {
  RHFCheckbox,
  RHFDatePicker,
  RHFFormProvider,
  RHFInput,
} from "@/src/components/hook-form";
import { Controller, useForm } from "react-hook-form";
import { addDays } from "date-fns";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { getFormattedDate } from "../libs/helper";

export const Booking = React.memo(() => {
  const [openCalender, setOpenCalender] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const toggleCalender = () => {
    setOpenCalender((prev) => !prev);
  };

  const bookingSchema = Yup.object().shape({
    destination: Yup.string().required("Destination is required"),
    // check_in: Yup.string().required("CheckIn is required"),
    // check_out: Yup.string().required("Checkout is required"),
  });

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      destination: "",
      // check_in: date.startDate || "",
      // check_out: date.endDate || "",
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  console.log(errors);

  const handleSubmit = async (data) => {
    try {
      console.log({
        destination: data.destination,
        check_in: date.startDate.toString(),
        check_out: date.endDate.toString(),
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(date);

  return (
    <RHFFormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(handleSubmit)}
      className=""
    >
      <div className="relative flex justify-center w-full bottom-40 md:bottom-24 lg:bottom-20">
        <div className="absolute  flex flex-col md:flex-row gap-5 md:gap-0 lg:gap-10 items-center w-11/12 lg:w-fit h-fit rounded-3xl shadow-lg p-5 sm:py-2 sm:px-10  bg-white mx-auto ">
          <div className="relative flex flex-col sm:flex-row justify-between md:justify-start items-center gap-5 md:gap-5  grow w-full">
            <div className="flex  gap-1 sm:gap-3">
              <Iconify
                iconName="carbon:location-filled"
                className="text-primary mt-1"
              />
              <span className="flex flex-col gap-2 items-center justify-start sm:justify-start w-full">
                <Typography
                  variant="p"
                  className="font-normal !text-sm !text-start !w-full py-1"
                >
                  Destinations
                </Typography>
                <RHFInput
                  type="text"
                  placeholder="Moxy Dortmunt City"
                  name="destination"
                  inputClass="outline-none border-none text-base  font-normal !p-0"
                  className="outline-none border-none !p-0 h-8"
                />
              </span>
            </div>
            <span className=" hidden sm:flex h-16 w-[2px] bg-primary" />

            <div className="flex gap-1 sm:gap-3">
              <Iconify iconName="ion:calendar" className="text-primary mt-1" />

              <div className="flex flex-col gap-1 sm:gap-2 w-auto">
                <span className="flex gap-7  items-center justify-start sm:justify-start w-full">
                  <Typography
                    variant="p"
                    className="font-normal !text-sm !text-start text-secondary  py-1  "
                  >
                    Check-in
                  </Typography>
                  <Typography
                    variant="p"
                    className="font-normal !text-sm !text-start text-secondary  py-1 "
                  >
                    Checkout
                  </Typography>
                </span>

                {/* CUSTOM CALENDER */}

                <Datepicker
                  primaryColor="red"
                  value={date}
                  placeholder={`${getFormattedDate()} - ${getFormattedDate(
                    Date()
                  )}`}
                  onChange={(newValue) => setDate(newValue)}
                  inputClassName="!text-sm md:text-base bg-transparent !appearance-none !text-black outline-none w-full  "
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full sm:w-fit text-nowrap ">
            Search
          </Button>
        </div>
      </div>
    </RHFFormProvider>
  );
});


