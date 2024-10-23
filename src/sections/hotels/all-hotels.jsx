"use client";
import React, { useState } from "react";

// Components and Others...
import {
  AnchorTag,
  Chip,
  HotelCard,
  Pannel,
  Typography,
  BgIcon,
  Button,
} from "@/src/components";
import { HotelsFilters } from "@/src/_mock/_hotel-filters";
import { cn } from "@/lib/utils";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { hotels } from "@/src/_mock/_hotels";
import { paths } from "@/src/contants";

export const AllHotels = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [zoom, setZoom] = React.useState(10);

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  };

  const center = {
    lat: 40.712776,
    lng: -74.005974,
  };

  return (
    <Pannel className="flex flex-col items-center gap-10 w-full h-full">
      <div className="flex flex-col gap-8 w-full">
        <Typography variant="h3" className="font-semibold text-center ">
          Our Hotels
        </Typography>
        <div className="flex flex-col  items-start gap-3">
          <Typography variant="h5" className="font-semibold ">
            Filters
          </Typography>
          <div className="flex items-center flex-wrap gap-2">
            {HotelsFilters?.map((hotel) => (
              <Chip
                className={cn(
                  activeFilter === hotel?.value &&
                    " text-custom-black bg-neutral-200"
                )}
              >
                {hotel?.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-5 xl:gap-10 justify-between h-full w-full">
        <div className="grid grid-cols-1 min-500:grid-cols-2 md:grid-cols-3 lg:grid-cols-2  min-1100:grid-cols-3 gap-5 w-full lg:w-3/5">
          {hotels?.map((item) => (
            <AnchorTag
              href={paths.hotels.getHotelById(item?.id)}
              className="relative w-full"
            >
              <div className="w-full h-auto relative">
                <img
                  src={item?.imageUrl}
                  alt={item?.hotelName}
                  className="w-full h-80"
                />
                <img
                  src="/assets/images/hotel-shadow.png"
                  alt={item.hotelName}
                  className="w-[96%] sm:w-[96%] h-80 absolute top-0 left-2"
                />
                <div className="absolute top-0 w-full h-full flex flex-col gap-1.5 justify-center hotels-center">
                  <Typography
                    variant="h4"
                    className=" text-xl lg:text-2xl font-bold text-white uppercase text-center font-lemonMilk"
                  >
                    {item.hotelName}
                  </Typography>
                  <Typography
                    variant="h5"
                    className=" text-lg lg:text-xl font-bold text-white uppercase font-lemonMilk text-center"
                  >
                    {item.city}
                  </Typography>
                  <Typography
                    variant="h5"
                    className=" text-lg md:text-xl lg:text-2xl font-normal text-white mt-2 text-center"
                  >
                    {item.country}
                  </Typography>
                </div>
                <div className="absolute bottom-2 left-8 w-full h-full flex flex-col justify-end hotels-start pb-5">
                  <Typography
                    variant="p"
                    className="!text-base font-semibold text-white"
                  >
                    {item.price} / Per Night
                  </Typography>
                  <Typography
                    variant="p"
                    className="!text-base font-semibold text-white"
                  >
                    {item.guestType}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-1 px-2">
                <Typography variant="p" className=" !text-15fs font-bold">
                  {item.eventTopic}
                </Typography>
                <Typography variant="p" className=" !text-sm font-medium">
                  {item.location}
                </Typography>
                <Typography variant="p" className="  !text-sm font-medium">
                  {item.dateRange}
                </Typography>
              </div>
              <BgIcon
                iconName="solar:heart-outline"
                iconClass="text-white size-5"
                className="bg-primary absolute top-3 right-3 !size-8 "
              />
            </AnchorTag>
          ))}
        </div>
        <div className=" h-96 lg:h-[800px] w-full lg:w-2/5">
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
      <Button className="mt-10"> Show More</Button>
    </Pannel>
  );
};
