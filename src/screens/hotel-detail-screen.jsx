"use client";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";

import {  BusinessFacts, Layout } from "../sections";
import {
  GuestReviews,
  HotelOverview,
  ThingsKnow,
  PopularAmenities,
  HotelDetail,
} from "../sections/hotel-details";
import Itinerary from "../sections/hotel-details/Itinerary";
import AvailabilityCalender from "../sections/hotel-details/availability-calender";

const HotelDetailScreen = React.memo(() => {
  return (
    <div className="w-full h-full">
      <Layout isNavBg={true}>
        <HotelOverview />
        <HotelDetail/>
        <Itinerary />
        <AvailabilityCalender />
        <PopularAmenities />
        {/* <BusinessFactsHotelDetail /> */}
        <BusinessFacts className="bg-white" />
        <ThingsKnow />
        <GuestReviews />
        {/* <BookingSteps /> */}
        {/* <HotelLocation /> */}
        {/* <NearByHotels /> */}
      </Layout>
    </div>
  );
});

export default HotelDetailScreen;
