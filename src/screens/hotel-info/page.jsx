"use client";
import React from "react";

import { StepperView } from "./components/stepper-view";

const HotelInformation = ({ defaultValues, isEdit }) => {
  return (
    <React.Fragment>
      <StepperView defaultValues={defaultValues} isEdit={isEdit} />
    </React.Fragment>
  );
};

export default HotelInformation;
