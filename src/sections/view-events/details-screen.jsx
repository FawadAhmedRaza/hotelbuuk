"use client";

import React, { useEffect, useState } from "react";

import "react-calendar/dist/Calendar.css";
import {
  HotelOverview,
  PopularAmenities,
  ThingsKnow,
  HotelDetail,
} from "../hotel-details";
import { BusinessFacts } from "../business-facts";
import AvailabilityCalendar from "../hotel-details/availability-calender";
import Itinerary from "../hotel-details/Itinerary";
import { useSelector } from "react-redux";

const EventDetailScreen = React.memo(({ type }) => {
  const [isMobile, setIsMobile] = useState(false);

  const { event } = useSelector((state) => state.allEvents.getById);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const clearDateRange = () => {
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 730);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="md:px-4">
        <HotelOverview type={type} />
        <HotelDetail />
        <BusinessFacts className="bg-white" />
        <AvailabilityCalendar
          dateRange={dateRange}
          handleDateChange={handleDateChange}
          isMobile={isMobile}
          clearDateRange={clearDateRange} // Pass clearDateRange as prop
        />
        <PopularAmenities />
        {event?.itinerary && <Itinerary />}
        <ThingsKnow />
      </div>
    </div>
  );
});

export default EventDetailScreen;
