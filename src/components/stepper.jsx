import React from "react";
import { Button, Iconify, Typography } from ".";
import { useFormContext } from "react-hook-form";

export const Stepper = ({
  steps,
  activeStep,
  handleNext,
  handleBack,
  isLastStep,
  loading
}) => {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      {/* Stepper container */}
      <div className="relative flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center z-20">
              <div
                className={`size-8 sm:size-14 flex items-center cursor-pointer justify-center rounded-full border-2 relative ${
                  index <= activeStep
                    ? "border-primary bg-primary text-white "
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                <Iconify
                  iconName={step.icon}
                  className={` size-3 sm:size-6 ${
                    index <= activeStep ? " text-white " : "text-primary"
                  }`}
                />
              </div>

              <Typography
                variant="p"
                className={`absolute top-10 sm:top-16 w-16 md:w-fit md:text-nowrap text-center !text-[10px] sm:!text-sm ${
                  index <= activeStep ? "text-primary" : "text-gray-500"
                }`}
              >
                {step.label}
              </Typography>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`w-full h-1 ${
                  index < activeStep ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Render the active component */}
      <div className="mt-20">{steps[activeStep]?.component}</div>

      {/* Navigation buttons */}
      <div className="flex justify-end gap-2 my-5">
        {activeStep !== 0 && (
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
        )}
        {!isLastStep && <Button onClick={handleNext}>Next</Button>}
        {isLastStep && (
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
