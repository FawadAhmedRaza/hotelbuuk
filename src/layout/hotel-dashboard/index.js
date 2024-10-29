import React from "react";

import { HotelDashboardNavBar } from "./navbar";

// --------------------------------------------

const HotelDashboardLayout = React.memo(({ children, isNavBg = true }) => {
  return (
    <>
      <HotelDashboardNavBar className={isNavBg ? "bg-primary  sticky" : ""} />
      {children}
    </>
  );
});

export default HotelDashboardLayout;
