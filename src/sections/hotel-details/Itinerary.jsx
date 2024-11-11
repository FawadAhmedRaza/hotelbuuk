import { Typography } from "@/src/components";
import React from "react";
import TimeLine from "./time-line";
import { Map } from "./map";

const Itinerary = () => {
  return (
    <div>
      <div className=" py-8">
        <Typography variant="h2" className=" font-semibold">
          Itinerary
        </Typography>
        <div className="grid grid-cols-12 gap-5 items-start mt-3">
          <div className="col-span-12 md:col-span-5">
            <TimeLine />
          </div>
          <div className="col-span-12 md:col-span-7  px-5 py-7">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
