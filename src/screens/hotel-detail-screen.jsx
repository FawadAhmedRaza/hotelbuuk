"use client";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";

import { BusinessFacts, Layout } from "../sections";
import {
  GuestReviews,
  HotelOverview,
  ThingsKnow,
  PopularAmenities,
  HotelDetail,
} from "../sections/hotel-details";
import Itinerary from "../sections/hotel-details/Itinerary";
import AvailabilityCalender from "../sections/hotel-details/availability-calender";
import { RHFDatePicker } from "../components/hook-form";
import { DateRange } from "react-date-range";
import { Pannel } from "../components";

const HotelDetailScreen = React.memo(() => {
  const [isMobile, setIsMobile] = useState(false);

  // Initialize dateRange as an array with a single selection object
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateChange = (ranges) => {
    // Update dateRange state as an array containing the selection
    setDateRange([ranges.selection]);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 930);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full">
      <Layout isNavBg={true}>
        <HotelOverview />
        <HotelDetail />
        <Itinerary />
        <AvailabilityCalender />
        <PopularAmenities />

        <Pannel className=" !px-20">
          <DateRange
            onChange={handleDateChange}
            months={2}
            ranges={dateRange}
            direction={isMobile ? "vertical" : "horizontal"}
            rangeColors={["#000000"]}
            className="w-full custom-calendar" // Apply a custom class for extra control
            style={{ width: "100%" }} // Ensure full width
          />
        </Pannel>
        <BusinessFacts className="bg-white " />
        <ThingsKnow />
        <GuestReviews />
      </Layout>
    </div>
  );
});

export default HotelDetailScreen;
