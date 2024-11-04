"use client";
import { Iconify, ImageModal, Pannel, Typography } from "@/src/components";
import Link from "next/link";
import React from "react";
import { Slider } from ".";
import { useBoolean } from "@/src/hooks";
import { useSelector } from "react-redux";

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

  const { event } = useSelector((state) => state.allEvents.getById);

  return (
    <Pannel className="flex flex-col gap-5 py-10 md:!py-5  px-5 sm:px-8 lg:px-14 xl:px-10 ">
      <ImageModal images={images} isOpen={isOpen} onClose={toggleDrawer} />
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-3">
        <div className=" flex flex-col justify-center items-center sm:justify-start sm:items-start gap-2 grow">
          <Typography variant="h3">
            {type === "NOMAD"
              ? event?.accomodation_type === "bnb"
                ? `${event?.city}`
                : `${event?.hotel?.hotel_name}, ${event?.hotel?.city}`
              : event?.hotel?.hotel_name + "," + event?.hotel?.city}
          </Typography>
          <div className=" flex gap-5 md:flex-row flex-col text-start flex-wrap items-center w-full ">
            <span className="flex items-center gap-3">
              <Iconify
                iconName="mdi:location"
                className="text-black size-3.5"
              />
              <Typography className=" font-medium" variant="p">
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
      <Slider images={images} />

      <div className="relative hidden sm:flex flex-row gap-2  w-full  h-[55vh]  xl:h-[63vh]">
        <span
          onClick={toggleDrawer}
          className="absolute right-5 bottom-5 bg-primary  rounded-lg  py-2 px-4 cursor-pointer"
        >
          <Typography variant="p" className="text-white">
            Show all Photos
          </Typography>
        </span>
        <img
          src="/assets/images/hotel-det-1.png"
          alt="hotel-1"
          className="w-full h-full"
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
          <div className="w-full h-full">
            <img
              src="/assets/images/hotel-det-2.png"
              alt="hotel-1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <img
              src="/assets/images/hotel-det-3.png"
              alt="hotel-1"
              className="w-full h-full object-cover rounded-tr-xl"
            />
          </div>
          <div className="w-full h-full">
            <img
              src="/assets/images/hotel-det-4.png"
              alt="hotel-1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <img
              src="/assets/images/hotel-det-5.png"
              alt="hotel-1"
              className="w-full h-full object-cover rounded-br-xl "
            />
          </div>
        </div>
      </div>
    </Pannel>
  );
};
