import React from "react";

// Components and Others...
import { AnchorTag } from "./anchor-tag";
import { BgIcon } from "./bg-icon";
import { Typography } from "./typography";
import { cn } from "@/lib/utils";
import { paths } from "../contants";
import ImageRender from "./ImageRenderer";

export const HotelCard = React.memo(({ hotel, className }) => {
  console.log("Events Data", hotel.title);

  return (
    <AnchorTag
      href={paths.hotels.getHotelById(hotel?.id)}
      className={cn("relative w-full !text-black", className)}
    >
      <div className="w-full h-full relative">
        {/* <img src={hotel.imageUrl} alt={hotel.title} className="w-full h-auto" /> */}

        <div className="h-80 relative">
          <div className="absolute rounded-3xl w-full inset-0 bg-gradient-to-t from-black to-transparent  opacity-75" />
          <ImageRender
            src={hotel?.event_images[0]?.img}
            type={"server"}
            alt={`Uploaded Image `}
            className="h-full w-full object-cover rounded-3xl "
          />
        </div>
        {/* <img
          src="/assets/images/hotel-shadow.png"
          alt={hotel.title}
          className="w-[96%] sm:w-[96%]  h-full absolute top-0 left-2"
        /> */}
        <div className="absolute top-0 w-full h-full flex flex-col gap-1.5 justify-center hotels-center">
          <Typography
            variant="h3"
            className="!text-2xl !md:text-3xl font-bold text-white uppercase text-center font-lemonMilk"
          >
            {hotel.title}
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
            className="!text-base font-semibold text-white font-dmSans"
          >
            ${hotel.price} / Per Night
          </Typography>
          <Typography
            variant="p"
            className="!text-base font-semibold text-white font-dmSans"
          >
            {hotel.business_category}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col  mt-1 px-2 !font-dmSans">
        <Typography variant="h6" className="font-bold ">
          {hotel.title}
        </Typography>
        <Typography variant="p" className="font-normal">
          {/* {hotel.location} */}
          {`${hotel.city}, ${hotel.country}`}
        </Typography>
        <Typography
          variant="p"
          className=" !text-sm font-medium text-neutral-400 mt-1"
        >
          {/* {hotel.dateRange} */}
          {`${hotel?.start_date?.toString().slice(4, 10)} - ${hotel?.end_date
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
