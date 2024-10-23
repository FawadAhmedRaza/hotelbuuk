import React from "react";

import { NomadDashboardNavBar } from "./navbar";

// --------------------------------------------

const NomadDashboardLayout = React.memo(({ children, isNavBg = true }) => {
  return (
    <>
      <NomadDashboardNavBar className={isNavBg ? "bg-primary static" : ""} />
      {children}
    </>
  );
});

export default NomadDashboardLayout;
