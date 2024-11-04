"use client";

import React, { useEffect, useState } from "react";

// Components and Others...
import { AnchorTag } from "./anchor-tag";
import { BgIcon } from "./bg-icon";
import { Typography } from "./typography";
import { cn } from "@/lib/utils";
import { paths } from "../contants";
import ImageRender from "./ImageRenderer";

export const HotelCard = React.memo(({ event, className }) => {
  return (
    <AnchorTag
      href={paths.hotels.getHotelById(event?.id, event?.type)}
      className={cn("relative w-full !text-black", className)}
    >
      <div className="w-full h-full relative">
        <div className="h-80 relative overflow-hidden rounded-3xl">
          <div className="absolute rounded-3xl w-full h-full inset-0 bg-black   opacity-45" />
          <ImageRender
            src={event?.event_images?.[0]?.img || event?.hotel?.hotel_image}
            type={"server"}
            alt={`Uploaded Image `}
            ratio="4/3" // Aspect ratio
            delayTime={300} // Add slight delay to improve UX
            threshold={200} // Start loading when 200px away from the viewport
            effect="opacity"
            wrapperProps={{
              style: { transitionDelay: "0.5s" }, // Adjust fade delay
            }}
            className="h-full w-full object-cover rounded-3xl  !event-card-shadow"
          />
        </div>
      
        <div className="absolute top-0 w-full  h-full flex flex-col gap-1.5 justify-center hotels-center">
          <Typography
            variant="h3"
            className="!text-2xl md:!text-[25px] !font-medium text-white uppercase text-center font-lemonMilk"
          >
            {event?.title?.length > 30
              ? `${event?.title.slice(0, 40)}...`
              : event?.title}
          </Typography>

          <Typography
            variant="h3"
            className="!text-[18px]  font-normal text-white uppercase font-lemonMilk text-center"
          >
            {event?.city}
          </Typography>
          <Typography
            variant="h4"
            className="font-normal !text-[15px] text-white -mt-5 text-center"
          >
            {event?.country}
          </Typography>
        </div>
        <div className="absolute bottom-2 left-5 w-full h-full flex flex-col justify-end hotels-start pb-3">
          <Typography
            variant="p"
            className="!text-base font-medium text-white font-dmSans"
          >
            ${event?.price} / Per Night
          </Typography>
          <Typography
            variant="p"
            className="!text-base font-medium text-white font-dmSans"
          >
            {event?.business_category}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col  mt-1 px-2 !font-dmSans">
        <Typography variant="h6" className="font-bold ">
          {event?.title}
        </Typography>
        <Typography variant="p" className="font-normal">
          {event?.type === "NOMAD"
            ? event?.accomodation_type === "bnb"
              ? `${event?.city} ${event?.country}`
              : `${event?.hotel?.city} ${event?.hotel?.country}`
            : `${event?.hotel?.city} ${event?.hotel?.country}`}
        </Typography>
        <Typography
          variant="p"
          className=" !text-sm font-medium text-neutral-400 mt-1"
        >
          {/* {hotel.dateRange} */}
          {`${event?.start_date?.toString().slice(4, 10)} - ${event?.end_date
            ?.toString()
            .slice(4, 10)}`}
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
