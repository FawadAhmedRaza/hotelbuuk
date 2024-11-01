"use client";
import { Iconify, ImageModal, Pannel, Typography } from "@/src/components";
import Link from "next/link";
import React from "react";
import { Slider } from ".";
import { useBoolean } from "@/src/hooks";
import { useSelector } from "react-redux";
import ImageRender from "@/src/components/ImageRenderer";
import ImageGallerySkeleton from "@/src/components/Skeleton/image-gallery-skeleton";
import HotelDetailsSkeleton from "@/src/components/Skeleton/hotel-details-skeleton";

const images = [
  "/assets/images/hotel-det-1.png",
  "/assets/images/hotel-det-2.png",
  "/assets/images/hotel-det-3.png",
  "/assets/images/hotel-det-4.png",
  "/assets/images/hotel-det-5.png",
];

const socialMedia = [
  { id: 1, icon: "ri:facebook-fill", href: "#" },
  { id: 2, icon: "prime:twitter", href: "#" },
  { id: 3, icon: "iconamoon:heart-light", href: "#" },
  { id: 4, icon: "material-symbols:share", href: "#" },
];

export const HotelOverview = ({ type }) => {
  const { isOpen, toggleDrawer } = useBoolean();

  const { event, isLoading } = useSelector((state) => state.allEvents.getById);

  console.log("Single evetn", event);
  const eventImages =
    Array.isArray(event?.event_images) && event?.event_images.length > 0
      ? event.event_images
      : [{ img: event?.hotel?.hotel_image }];

  return (
    <Pannel className="flex flex-col gap-5 py-10 md:!py-5  px-5 sm:px-8 lg:px-14 xl:px-10 ">
      <ImageModal 
        images={eventImages || []}
        isOpen={isOpen}
        onClose={toggleDrawer}
      />

      {isLoading ? (
        <HotelDetailsSkeleton />
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-3">
          <div className=" flex flex-col justify-center items-center sm:justify-start sm:items-start gap-2 grow">
            <Typography variant="h3" className="md:text-[27px]  font-medium">
              {type === "NOMAD"
                ? event?.accomodation_type === "bnb"
                  ? `${event?.city}`
                  : `${event?.hotel?.hotel_name}, ${event?.hotel?.city}`
                : event?.hotel?.hotel_name + "," + event?.hotel?.city}
            </Typography>
            <div className=" flex gap-5 md:flex-row flex-col text-start flex-wrap -mt-1  items-center w-full ">
              <span className="flex items-center gap-2">
                <Iconify
                  iconName="mdi:location"
                  className="text-gray-500 size-3.5 "
                />
                <Typography className=" font-medium text-gray-500" variant="p">
                  {type === "NOMAD"
                    ? event?.accomodation_type === "bnb"
                      ? `${event?.address} ${event?.city} ${event?.country}`
                      : `${event?.hotel?.address}, ${event?.hotel?.city}, ${event?.hotel?.country}`
                    : `${event?.hotel?.address}, ${event?.hotel?.city}, ${event?.hotel?.country}`}
                </Typography>
              </span>
              <span className="flex items-center gap-3">
                <Iconify iconName="gg:phone" className="text-black size-3.5" />
                <Typography className=" text-nowrap font-medium" variant="p">
                  {event?.hotel?.hotel_contact_no}
                </Typography>
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            {socialMedia?.map((item) => (
              <Link
                href={item?.href}
                className=" flex justify-center items-center w-12 h-12 rounded-lg border border-primary"
              >
                <Iconify iconName={item?.icon} className="text-black" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <Slider images={eventImages} />

      {isLoading ? (
        <ImageGallerySkeleton />
      ) : (
        <div className="relative hidden sm:flex flex-row gap-2  w-full  h-[55vh]  xl:h-[63vh]">
          <span
            onClick={toggleDrawer}
            className="absolute right-5 z-20 bottom-5 bg-primary  rounded-lg  py-2 px-4 cursor-pointer"
          >
            <Typography variant="p" className="text-white">
              Show all Photos
            </Typography>
          </span>
          <span
            onClick={toggleDrawer}
            className="h-full w-full rounded-l-2xl rounded-bl-2xl "
          >
            <ImageRender
              src={event?.event_images?.[0]?.img || event?.hotel?.hotel_image}
              type={"server"}
              alt="Lazy Loaded Image"
              ratio="4/3" // Aspect ratio
              delayTime={300} // Add slight delay to improve UX
              threshold={200} // Start loading when 200px away from the viewport
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "0.5s" }, // Adjust fade delay
              }}
              className="h-full w-full rounded-l-2xl rounded-bl-2xl cursor-pointer"
            />
          </span>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
            {eventImages?.slice(0, 4).map((img, index) => (
              <div
                key={img.id}
                className="relative w-full h-full cursor-pointer"
                onClick={toggleDrawer}
              >
                <ImageRender
                  src={img.img}
                  type="server"
                  alt="Uploaded Image"
                  ratio="4/3" // Aspect ratio
                  delayTime={300} // Add slight delay to improve UX
                  threshold={200} // Start loading when 200px away from the viewport
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "0.5s" }, // Adjust fade delay
                  }}
                  className={`h-full w-full object-cover ${
                    index === 1 && "rounded-tr-2xl"
                  } ${index === 3 && "rounded-br-2xl"}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Pannel>
  );
};
