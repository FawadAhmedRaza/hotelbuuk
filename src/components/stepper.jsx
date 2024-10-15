"use client";
import React from "react";
import { Button, Iconify, Typography } from "../components";
import { useFormContext } from "react-hook-form";

export const Stepper = ({ steps, activeStep, setActiveStep }) => {
  const { watch } = useFormContext();
  const readStep = watch("business_meeting");

  console.log(readStep ? true : false);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  return (
    <div className="w-full px-4 md:px-8 py-4">
      {/* Stepper container */}
      <div className="relative flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center z-20">
              <div
                className={`size-14 flex items-center cursor-pointer justify-center rounded-full border-2 relative ${
                  index <= activeStep
                    ? "border-primary bg-primary text-white "
                    : "border-gray-300 bg-white text-gray-500"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <Iconify
                  iconName={step.icon}
                  className={` size-6 ${
                    index <= activeStep ? " text-white " : "text-primary"
                  }`}
                />
              </div>

              <Typography
                variant="p"
                className={`  absolute top-16 w-28 md:w-fit md:text-nowrap  text-center ${
                  index <= activeStep ? "text-primary" : "text-gray-500"
                }`}
              >
                {step.label}
              </Typography>
            </div>

            {/* Line between steps */}
            {index < steps.length - 1 && (
              <div
                className={`w-full h-1  ${
                  index < activeStep ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Render the active component below the stepper */}
      <div className="mt-20">{steps[activeStep]?.component}</div>

      <div className="flex justify-end my-5">
        {steps.length === activeStep + 1 ? (
          <div className="flex gap-5">
            <Button>Preview</Button>
            <Button type="submit">Submit</Button>
          </div>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  );
};
