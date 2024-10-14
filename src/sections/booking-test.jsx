"use client";

import React, { useRef } from "react";
import { Button, Iconify, Typography } from "../components";
import { RHFFormProvider, RHFInput } from "../components/hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const BookingTest = React.memo(() => {
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const BookingSchema = Yup.object().shape({
    destination: Yup.string().required("Destination is required"),
    check_in: Yup.string().required("checkIn date is required"),
    check_out: Yup.string().required("CheckOut date is required"),
  });

  const methods = useForm({
    resolver: yupResolver(BookingSchema),

    defaultValues: {
      destination: "",
      check_in: "",
      check_out: "",
    },
  });

  const {
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  console.log(errors);

  const handleSubmit = async (data) => {
    console.log(data);

    // await login(data);
  };

  // Handle click on custom icon/text to open the date picker
  const openDatePicker = () => {
    checkInRef.current.showPicker(); // Opens the date picker
    checkInRef.current.showPicker(); // Opens the date picker
  };

  const getFormattedDate = (inputDate) => {
    const date = new Date(inputDate); // Create a Date object from the input date
    const options = { weekday: "short", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options).replace(",", ""); // Format and return the date
  };

  return (
    <RHFFormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(handleSubmit)}
      className=""
    >
      <div className=" flex flex-col md:flex-row gap-5 md:gap-0 items-center w-11/12 lg:w-10/12 h-fit rounded-3xl shadow-lg p-5 sm:py-3 sm:px-10  -mt-14 !z-30 bg-white mx-auto mb-10">
        <div className="flex flex-col sm:flex-row justify-between md:justify-start items-center gap-3 md:gap-10 lg:gap-20 xl:gap-28 grow w-full">
          <div className="flex flex-col gap-1 sm:gap-3">
            <span className="flex gap-3 items-center justify-center sm:justify-start w-full">
              <Iconify
                iconName="carbon:location-filled"
                className="text-primary"
              />
              <RHFInput
                // label="Destination"
                type="text"
                placeholder="Destination"
                name="destination"
                inputClass="border-none  outline-none"
                // className="border-none  outline-none"
              />
            </span>
            <Typography variant="h6" className="font-medium ">
              Moxy Dortmunt City
            </Typography>
          </div>
          <span className=" hidden sm:flex h-24 w-[2px] bg-primary" />
          <div className="flex flex-col gap-1 sm:gap-3">
            <span className="flex gap-3 items-center justify-center sm:justify-start w-full">
              <Iconify iconName="ion:calendar" className="text-primary" />

              <Typography
                variant="p"
                className="text-sm text-secondary uppercase"
              >
                night
              </Typography>
            </span>

            <div className="flex items-center">
              <div className="relative">
                {/* Hidden Date Input */}
                <input
                  type="date"
                  ref={checkInRef}
                  className=" appearance-none   rounded-lg px-3 py-2 text-black w-full 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none",
                  }} // Hide input without breaking accessibility
                />

                {/* Custom Icon or Text */}
                <div
                  className="flex items-center justify-between  rounded-lg px-3 py-2 
                   cursor-pointer hover:bg-gray-100"
                  onClick={() => checkInRef.current.showPicker()}
                >
                  <span className="text-base md:text-lg font-normal">
                    {getFormattedDate(Date())}
                  </span>{" "}
                </div>
              </div>
              <Typography variant="h6" className="font-medium ">
                -
              </Typography>

              <div className="relative">
                {/* <input
                  type="date"
                  ref={checkOutRef}
                  className="appearance-none   rounded-lg px-3 py-2 text-black w-full 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none",
                  }} // Hide input without breaking accessibility
                /> */}
                {/* <RHFInput
                  inputClass="border border-blue-500"
                  ref={checkOutRef} // Pass the ref to the component
                  onClick={() => checkOutRef.current.showPicker()} // Handle the date selection
                /> */}

                {/* 
                <div
                  className="flex items-center justify-between  rounded-lg px-3 py-2 
                   cursor-pointer hover:bg-gray-100"
                  onClick={() => checkOutRef.current.showPicker()}
                >
                  <span className="text-base md:text-lg font-normal">
                    {getFormattedDate(Date())}
                  </span>{" "}
                </div> */}
              </div>
            </div>

            {/* <RHFInput
              // label="Destination"
              type="date"
              placeholder="Destination"
              name="destination"
              className="!border-none !outline-none"
              inputClass="!border-none !outline-none !appearance-none  !focus:outline-none !focus:ring-2 !focus:ring-blue-500"
            /> */}
            {/* <Typography variant="h6" className="font-medium">
              wed oct 02 - thu, oct 03
            </Typography> */}
          </div>
        </div>
        <Button type="submit" className=" w-full sm:w-fit">
          Book Now
        </Button>
      </div>
    </RHFFormProvider>
  );
});
