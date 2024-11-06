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
import AvailabilityCalendar from "../sections/hotel-details/availability-calender";
import { useSelector } from "react-redux";
// import AvailabilityCalendar from "../sections/hotel-details/availability-calender";

const HotelDetailScreen = React.memo(({ type, id }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { isLoading, event } = useSelector((state) => state.allEvents.getById);

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
      setIsMobile(window.innerWidth < 930);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDateRange([
      {
        startDate: event?.start_date,
        endDate: event?.end_date,
        key: "selection",
      },
    ]);
  }, []);

  return (
    <div className="w-full h-full">
      <Layout isNavBg={true}>
        <div className=" md:px-4">
          <HotelOverview type={type} />
          <HotelDetail type={type} id={id} />
          <BusinessFacts className="bg-white" />
          <AvailabilityCalendar
            dateRange={dateRange}
            handleDateChange={handleDateChange}
            isMobile={isMobile}
            clearDateRange={clearDateRange} // Pass clearDateRange as prop
          />
          <PopularAmenities />
          <Itinerary />
          <ThingsKnow />
          <GuestReviews />
        </div>
      </Layout>
    </div>
  );
});

export default HotelDetailScreen;
