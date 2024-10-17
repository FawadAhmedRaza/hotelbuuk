"use client"
import React from "react";

import { Pannel } from "@/src/components";
import HotelCards from "./components/cards";
import RecentBooking from "./components/recent-booking";

const HotelDashboardSections = () => {
  return (
    <Pannel>
      <HotelCards />
      <RecentBooking/>
    </Pannel>
  );
};

export default HotelDashboardSections;
