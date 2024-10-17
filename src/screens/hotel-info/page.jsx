import React, { useState } from "react";

import { NavBar } from "@/src/sections";
import { StepperView } from "./components/stepper-view";

const HotelInformation = () => {
  return (
    <React.Fragment>
      <NavBar className="bg-primary static" />
      <StepperView />
    </React.Fragment>
  );
};

export default HotelInformation;
