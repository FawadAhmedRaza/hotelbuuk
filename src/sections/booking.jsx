"use client";

import React, { useRef } from "react";
import { Button, Iconify, Typography } from "../components";
import * as Yup from "yup";
import {
  RHFCheckbox,
  RHFFormProvider,
  RHFInput,
} from "@/src/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Booking = React.memo(() => {
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const SignUpSchema = Yup.object().shape({
    destination: Yup.string().required("Destination is required"),
    check_in: Yup.string().required("CheckIn is required"),
    check_out: Yup.string().required("Checkout is required"),
  });

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      destination: "",
      check_in: "",
      check_out: "",
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  console.log(errors);

  const handleSubmit = async (data) => {
    try {
      await register(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const getFormattedDate = (inputDate) => {
    const date = new Date(inputDate); // Create a Date object from the input date
    const options = { weekday: "short", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options).replace(",", ""); // Format and return the date
  };

  console.log("ref values", checkInRef.current);
  return (
    <RHFFormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(handleSubmit)}
      className=""
    >
      <div className="relative flex justify-center w-full bottom-32 md:bottom-20 lg:bottom-24">
        <div className="absolute  flex flex-col md:flex-row gap-5 md:gap-0 items-center w-11/12 lg:w-10/12 h-fit rounded-3xl shadow-lg p-5 sm:py-2 sm:px-10 !z-30 bg-white mx-auto ">
          <div className=" flex flex-col sm:flex-row justify-between md:justify-start items-center gap-3 md:gap-10 lg:gap-20 xl:gap-28 grow w-full">
            <div className="flex flex-col gap-1 sm:gap-3">
              <span className="flex gap-3 items-center justify-center sm:justify-start w-full">
                <Iconify
                  iconName="carbon:location-filled"
                  className="text-primary"
                />

                <Typography
                  variant="p"
                  className="text-sm text-secondary uppercase"
                >
                  Destination
                </Typography>
              </span>
              <Typography variant="p" className="font-medium">
                Moxy Dortmunt City
              </Typography>
            </div>
            <span className=" hidden sm:flex h-20 w-[2px] bg-primary" />
            <div className="flex gap-5">
              <Iconify iconName="ion:calendar" className="text-primary my-2" />

              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="flex gap-7 items-center justify-center sm:justify-start w-full">
                  {/* <Iconify iconName="ion:calendar" className="text-primary" /> */}
                  <Typography
                    variant="p"
                    className="text-sm text-secondary px-3 py-2  "
                  >
                    Check-in
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-sm text-secondary px-3 py-2 "
                  >
                    Checkout
                  </Typography>
                </span>

                {/* CUSTOM CALENDER */}

                <div className="flex items-center">
                  <div className="relative">
                    {/* Hidden Date Input */}
                    <input
                      type="date"
                      ref={checkInRef}
                      // value={checkInRef.current.value}
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
                    {/* Hidden Date Input */}
                    <input
                      type="date"
                      ref={checkOutRef}
                      // value={checkOutRef.current.value}
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
                      onClick={() => checkOutRef.current.showPicker()}
                    >
                      <span className="text-base md:text-lg font-normal">
                        {getFormattedDate(Date())}
                      </span>{" "}
                    </div>
                  </div>
                </div>
                {/* <Typography variant="p" className="font-medium">
                  wed oct 02 - thu, oct 03
                </Typography> */}
              </div>
            </div>
          </div>
          <Button className=" w-full sm:w-fit text-nowrap">Book Now</Button>
        </div>
      </div>
    </RHFFormProvider>
  );
});
