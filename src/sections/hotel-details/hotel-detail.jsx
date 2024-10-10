import { HotelQNA } from "@/src/_mock/_hotel-qna";
import { Accordion, Typography } from "@/src/components";
import React from "react";
import { HotelBio } from "./hotel-bio";
import { HostBio } from "./host-bio";

export const HotelDetail = () => {
  return (
    <div className="flex flex-col justify-between py-10 px-5 sm:px-8 lg:px-14 xl:px-20 ">
      <Typography variant="h3" className="font-medium text-xl md:text-3xl mb-3">
        Refresh your mind before your business meetings
      </Typography>
      <Typography variant="h5">Lorem ipsum lorem ipsum</Typography>
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-3 ">
        <div className=" flex flex-col gap-5 h-full w-full ">
          <div className="flex flex-col gap-3">
            <Typography
              variant="h3"
              className="font-semibold text-xl md:text-3xl"
            >
              what you'll learn
            </Typography>
            <Typography
              variant="h3"
              className="font-light text-primary text-xl md:text-3xl"
            >
              Stay For Business Meetings
            </Typography>
          </div>
          <div className="flex flex-col gap-3">
            {HotelQNA?.map((item) => (
              <Accordion title={item?.title}>
                <Typography variant="p">{item?.answer}</Typography>
              </Accordion>
            ))}
          </div>
        </div>
        <HostBio />
      </div>
      <HotelBio />
    </div>
  );
};
