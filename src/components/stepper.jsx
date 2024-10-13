import React from "react";
import { Iconify, Typography } from "../components";

export const Stepper = ({ steps, activeTabStepper, setActiveTabStepper }) => {
  return (
    <div className="w-full px-8 py-4">
      {/* Stepper container */}
      <div className="relative flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center z-20">
              <div
                className={`w-12 h-12 flex items-center cursor-pointer justify-center rounded-full border-2 relative ${
                  index <= activeTabStepper
                    ? "border-primary bg-primary text-white "
                    : "border-gray-300 bg-white text-gray-500"
                }`}
                onClick={() => setActiveTabStepper(index)} 
              >
                <Iconify icon={step.icon} className="w-6 h-6" />
              </div>

              <Typography
                className={`mt-2 !text-sm absolute -bottom-6   ${
                  index <= activeTabStepper ? "text-pribg-primary" : "text-gray-500"
                }`}
              >
                {step.label}
              </Typography>
            </div>

            {/* Line between steps */}
            {index < TABS.length - 1 && (
              <div
                className={`w-full h-1  ${
                  index < activeTabStepper ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Render the active component below the stepper */}
      <div className="mt-10">
        {TABS[activeTabStepper]?.component}
      </div>
    </div>
  );
};

