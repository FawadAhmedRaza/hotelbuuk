import React from "react";

import { HotelDashboardNavBar } from "./navbar";

// --------------------------------------------

const HotelDashboardLayout = React.memo(({ children, isNavBg = true }) => {
  return (
    <>
      <HotelDashboardNavBar className={isNavBg ? "bg-primary static" : ""} />
      {children}
    </>
  );
});

export default HotelDashboardLayout;
