import React from "react";

import { HotelNavbar } from "@/src/sections/hotel-dashboard-sections/hotel-nav";
import HotelDashboardSections from "./sections";

const HotelDashboardLayout = () => {
  return (
    <React.Fragment>
      <HotelNavbar className="bg-primary static" />
      <HotelDashboardSections />
    </React.Fragment>
  );
};

export default HotelDashboardLayout;
