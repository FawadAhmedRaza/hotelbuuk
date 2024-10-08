import React from "react";
import { Button, Iconify, Typography } from "../components";

export const Booking = React.memo(() => {
  return (
    <div className=" flex items-center w-10/12 h-fit rounded-3xl shadow-lg py-10 px-10  border -mt-20 !z-30 bg-white mx-auto">
      <div className="flex justify-start items-center gap-28 grow">
        <div className="flex flex-col gap-3">
          <span className="flex gap-3 items-center">
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

        <span className="h-24 border-[3px] border-primary" />
        <div className="flex flex-col gap-3">
          <span className="flex gap-3 items-center">
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
      <Button>Book Now</Button>
    </div>
  );
});
