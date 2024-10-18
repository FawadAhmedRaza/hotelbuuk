"use client";
import React from "react";

import { Pannel } from "@/src/components";
import HotelCards from "./components/cards";
import RecentBooking from "./components/recent-booking";
import MountChart from "./components/chart/mount-chart";
import ThisMonthBooking from "./components/chart/this-mount-bookin";

const HotelDashboardSections = () => {
  return (
    <Pannel>
      <HotelCards />
      <RecentBooking />
      <div  className="grid grid-cols-1 md:grid-cols-2 gap-6" >
        <div>
          <MountChart />
        </div>
        <div>
          <ThisMonthBooking />
        </div>
        
      </div>
    </Pannel>
  );
};

export default HotelDashboardSections;
