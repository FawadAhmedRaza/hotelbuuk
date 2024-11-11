"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Accordion, Card, Typography } from "@/src/components";
import { HotelBio } from "./hotel-bio";
import { HostBio } from "./host-bio";

export const HotelDetail = ({ type, id }) => {
  const { event } = useSelector((state) => state.allEvents.getById);

  return (
    <div className="flex flex-col justify-between md:py-10 !pt-4  px-5 sm:px-8 lg:px-10 xl:px-10 ">
      <Typography
        variant="h3"
        className="font-medium !text-xl md:!text-2xl mb-5 text-gray-600"
      >
        Refresh your mind before your business meetings
      </Typography>
      <div className=" flex ga5 flex-col lg:flex-row w-full gap-5 ">
        <div className="  w-full lg:w-[70%] ">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-3 ">
            <div className=" flex flex-col gap-2 h-full w-full ">
              <div className="flex flex-col ">
                <Typography
                  variant="h3"
                  className="font-semibold !text-[1.26rem] md:text-2xl "
                >
                  What you'll learn
                </Typography>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Card className="flex flex-col gap-3  w-full p-3 shadow-md">
                  {event?.event_topics?.map((item, index) => (
                    <Accordion
                      key={item?.id}
                      title={item?.title}
                      isOpen={index === 0}
                      className="text-black font-normal text-base"
                    >
                      <Typography
                        variant="p"
                        className="   !text-[15px]  -pl-20 text-gray-500"
                      >
                        {item?.description}
                      </Typography>
                    </Accordion>
                  ))}
                </Card>
                <div className=" mt-5">
                  <Typography
                    variant="h3"
                    className="font-semibold text-primary"
                  >
                    About the Hotel
                  </Typography>
                  <Typography
                    variant="p"
                    className="!text-[15px] text-secondary mt-2"
                  >
                    {event?.accomodation_type === "bnb"
                      ? event?.about_bnb
                      : event?.hotel?.description}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-5 w-full lg:w-[30%] ">
          <HostBio />
        </div>
      </div>
      {/* <HotelBio type={type} id={id} /> */}
    </div>
  );
};
