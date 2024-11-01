"use client";

import { HotelQNA } from "@/src/_mock/_hotel-qna";
import { Accordion, Card, Typography } from "@/src/components";
import React from "react";
import { HotelBio } from "./hotel-bio";
import { HostBio } from "./host-bio";
import { useSelector } from "react-redux";
import Built from "@/src/components/built";

export const HotelDetail = () => {
  const { event } = useSelector((state) => state.allEvents.getById);

  return (
    <div className="flex flex-col justify-between md:py-10 !pt-4  px-5 sm:px-8 lg:px-14 xl:px-10 ">
      <div>
        <Typography
          variant="h3"
          className="font-medium text-xl md:text-2xl mb-5 text-gray-600"
        >
          Refresh your mind before your business meetings
        </Typography>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5 mt-3 ">
          <div className=" flex flex-col gap-5 h-full    w-full lg:w-[70%]">
            <div className="flex flex-col gap-3">
              <Typography
                variant="h3"
                className="font-medium text-xl md:text-2xl "
              >
                What you'll learn
              </Typography>
            </div>
            <div className="flex flex-col gap-3 w-full flex-wrap">
              <Card className="flex flex-col gap-3  w-full p-5">
                {event.event_topics?.map((item, index) => (
                  <Accordion
                    key={item.id} // Make sure to include a unique key for each accordion
                    title={item?.title}
                    isOpen={index === 0} // Open the first accordion by default
                  >
                    <Typography variant="p" className=" text-gray-500">
                      {item?.description}
                    </Typography>
                  </Accordion>
                ))}
              </Card>
              <div className=" mt-5">
                <Typography variant="h3" className="font-semibold text-primary">
                  Hotel Bio
                </Typography>
                <Typography
                  variant="p"
                  className="!text-sm text-secondary mt-2"
                >
                  {event?.description}
                </Typography>
              </div>
            </div>
          </div>

          <div className=" sticky top-5 w-full  lg:w-[30%]  ">
            <HostBio />
          </div>
        </div>
        <HotelBio />
      </div>
    </div>
  );
};
