import React from "react";

import { GuestDashboardNavBar } from "./navbar";

// --------------------------------------------

const GuestDashboardLayout = React.memo(({ children, isNavBg = true }) => {
  return (
    <>
      <GuestDashboardNavBar className={isNavBg ? "bg-primary  sticky" : ""} />
      {children}
    </>
  );
});

export default GuestDashboardLayout;
