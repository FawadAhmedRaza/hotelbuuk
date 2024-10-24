"use client";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";

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
import BusinessFactsHotelDetail from "../sections/hotel-details/businessFacts-hotel-detail";
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

        <BusinessFactsHotelDetail />
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
