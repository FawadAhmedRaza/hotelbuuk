"use client";
import React from "react";

// Components and Others...
import { Pannel, Stepper } from "@/src/components";
import { BussinessMeeting } from "./bussiness-meeting";
import { RHFFormProvider } from "@/src/components/hook-form";
import { useForm } from "react-hook-form";
import { GuestLearn } from "./guest";
import { SetAvailability } from "./availabilty";

export const StepperView = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const method = useForm();
  const submit = () => {};

  const steps = [
    {
      label: "Bussiness Meeting Info",
      icon: "mdi:business-outline",
      value: "bussiness",
      component: <BussinessMeeting />,
    },
    {
      label: "What Guest will Learn",
      icon: "octicon:person-16",
      value: "guest",
      component: <GuestLearn />,
    },
    {
      label: "Set Availability",
      icon: "heroicons:hand-thumb-up",
      value: "availability",
      component: <SetAvailability />,
    },
  ];

  return (
    <Pannel>
      <RHFFormProvider methods={method} onSubmit={method.handleSubmit(submit)}>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </RHFFormProvider>
    </Pannel>
  );
};
