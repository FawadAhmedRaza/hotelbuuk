"use client";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";

// import { Calendar } from "../components/shadcn-calander";
// Components and Others..
import { BookingSteps, Layout } from "../sections";
import {
  GuestReviews,
  HotelLocation,
  HotelOverview,
  NearByHotels,
  ThingsKnow,
  PopularAmenities,
  HotelDetail,
} from "../sections/hotel-details";
import TimeLine from "../sections/hotel-details/time-line";
import { Map } from "../sections/hotel-details/map";
import { Typography } from "../components";
import { ShadCnCalendar } from "../components/shadcn-calander";

const HotelDetailScreen = React.memo(() => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="w-full h-full">
      <Layout isNavBg={true}>
        <HotelOverview />

        <div className=" py-8">
          <Typography variant="h2" className="px-12 font-semibold">
            Itinerary
          </Typography>
          <div className="grid grid-cols-12 gap-5 items-start mt-3">
            <div className="col-span-12 md:col-span-5">
              <TimeLine />
            </div>
            <div className="col-span-12 md:col-span-7  px-5 py-7">
              <Map />
            </div>
          </div>
        </div>

        <div>
          <ShadCnCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border bottom-2"
          />
        </div>
        <HotelDetail />
        {/* <BookingSteps /> */}
        <PopularAmenities />
        {/* <HotelLocation /> */}
        <GuestReviews />
        <ThingsKnow />
        <NearByHotels />
      </Layout>
    </div>
  );
});

export default HotelDetailScreen;
