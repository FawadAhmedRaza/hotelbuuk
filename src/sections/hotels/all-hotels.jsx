import React from "react";

// Components and Others...
import { Chip, Pannel, Typography } from "@/src/components";
import { HotelsFilters } from "@/src/_mock/_hotel-filters";

export const AllHotels = () => {
  return (
    <Pannel className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <Typography variant="h3" className="font-semibold text-center ">
          Our Hotels
        </Typography>
        <div className="flex items-center gap-2">
          {HotelsFilters?.map((hotel) => (
            <Chip></Chip>
          ))}
        </div>
      </div>
    </Pannel>
  );
};
