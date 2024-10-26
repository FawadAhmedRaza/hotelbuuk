import React from "react";

// Components and Others... 
import { AnchorTag } from "./anchor-tag";
import { BgIcon } from "./bg-icon";
import { Typography } from "./typography";
import { cn } from "@/lib/utils";
import { paths } from "../contants";

export const HotelCard = React.memo(({ hotel, className }) => {
  return (
    <AnchorTag
      href={paths.hotels.getHotelById(hotel?.id)}
      className={cn("relative w-full", className)}
    >
      <div className="w-full h-auto relative">
        <img
          src={hotel.imageUrl}
          alt={hotel.hotelName}
          className="w-full h-auto"
        />
        <img
          src="/assets/images/hotel-shadow.png"
          alt={hotel.hotelName}
          className="w-[96%] sm:w-[96%] h-auto absolute top-0 left-2"
        />
        <div className="absolute top-0 w-full h-full flex flex-col gap-1.5 justify-center hotels-center">
          <Typography
            variant="h3"
            className="!text-2xl !md:text-3xl font-bold text-white uppercase text-center font-lemonMilk"
          >
            {hotel.hotelName}
          </Typography>
          <Typography
            variant="h3"
            className="!text-2xl !md:text-3xl font-bold text-white uppercase font-lemonMilk text-center"
          >
            {hotel.city}
          </Typography>
          <Typography
            variant="h4"
            className="font-normal text-white mt-2 text-center"
          >
            {hotel.country}
          </Typography>
        </div>
        <div className="absolute bottom-2 left-8 w-full h-full flex flex-col justify-end hotels-start pb-5">
          <Typography
            variant="p"
            className="!text-base font-semibold text-white"
          >
            {hotel.price} / Per Night
          </Typography>
          <Typography
            variant="p"
            className="!text-base font-semibold text-white"
          >
            {hotel.guestType}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-1 px-2">
        <Typography variant="p" className="font-bold">
          {hotel.eventTopic}
        </Typography>
        <Typography variant="p" className="font-normal">
          {hotel.location}
        </Typography>
        <Typography variant="p" className="font-medium">
          {hotel.dateRange}
        </Typography>
      </div>
      <BgIcon
        iconName="solar:heart-outline"
        iconClass="text-white"
        className="bg-primary absolute top-4 right-6 "
      />
    </AnchorTag>
  );
});