import { Pannel, Typography } from "@/src/components";
import React from "react";

export const HotelLocation = () => {
  return (
    <Pannel className="flex flex-col gap-5 md:gap-10 items-start ">
      <Typography variant="h4" className="font-medium">
        LOCATION & DISTANCE
      </Typography>
      <img src="/assets/images/map.png" alt="map" className="w-full h-fit" />
    </Pannel>
  );
};
