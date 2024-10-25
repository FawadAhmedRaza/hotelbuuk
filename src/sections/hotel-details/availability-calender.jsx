"use client";
import { Typography } from "@/src/components";
import { ShadCnCalendar } from "@/src/components/shadcn-calander";
import React, { useState } from "react";

const AvailabilityCalender = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className=" flex gap-5 w-full my-10 px-10 md:flex-row flex-col  justify-between items-start">
        <div className="  space-y-5 mt-4 ">
          <Typography variant="h1">Select Booking Date</Typography>
          <Typography variant="p" className=" pe-6">
            Select your preferred check-in date to explore available rooms and
            rates for your stay. We offer a wide range of options to suit both
            short-term and extended stays, ensuring comfort and flexibility.
            Booking early helps secure the best prices and guarantees your spot
            during busy seasons. Whether you're traveling for leisure or
            business, our hotel provides top-tier amenities to enhance your
            experience. Select your dates and begin planning the perfect stay
            with us today
          </Typography>
        </div>
        <div className="flex justify-end items-center   pe-10">
          <ShadCnCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-xl  border  border-gray-200 shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalender;
