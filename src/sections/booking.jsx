import React from "react";
import { Button, Iconify, Typography } from "../components";

export const Booking = React.memo(() => {
  return (
    <div className=" flex flex-col md:flex-row gap-5 md:gap-0 items-center w-11/12 lg:w-10/12 h-fit rounded-3xl shadow-lg p-5 sm:py-3 sm:px-10  -mt-14 !z-30 bg-white mx-auto mb-10">
      <div className="flex flex-col sm:flex-row justify-between md:justify-start items-center gap-3 md:gap-10 lg:gap-20 xl:gap-28 grow w-full">
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
          <Typography variant="h6" className="font-medium">
            Moxy Dortmunt City
          </Typography>
        </div>
        <span className=" hidden sm:flex h-24 border-[3px] border-primary" />
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
          <Typography variant="h6" className="font-medium">
            wed oct 02 - thu, oct 03
          </Typography>
        </div>
      </div>
      <Button className=" w-full sm:w-fit">Book Now</Button>
    </div>
  );
});
