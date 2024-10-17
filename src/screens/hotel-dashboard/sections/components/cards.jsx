import { Card, Iconify, Typography } from "@/src/components";
import React from "react";

const HotelCards = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <Card className="md:col-span-3 col-span-12 flex-col flex gap-2">
        <div className="flex gap-2 w-full flex-auto md:flex-initial">
          <div className="rounded-full border-2 w-min h-min border-primary">
            <Iconify
              iconName="mdi:shop-complete"
              className="!text-primary size-10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Typography variant="h5">Total Bookings</Typography>
            <Typography variant="h4" className="!text-black !font-bold">
              35
            </Typography>
          </div>
        </div>

        <div className="w-full text-center py-2 bg-gray-100 rounded-md">
          <Typography
            variant="p"
            className="text-primary font-semibold cursor-pointer"
          >
            VIEW DETAILS
          </Typography>
        </div>
      </Card>

      <Card className="md:col-span-3 col-span-12">
        <Typography variant="h4" className="">
          Total Bookings
        </Typography>
      </Card>
    </div>
  );
};

export default HotelCards;
