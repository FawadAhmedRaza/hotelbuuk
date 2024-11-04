import React from "react";
import { Card, Pannel, Typography } from "../components";
import Image from "next/image";
import { useTranslation } from "react-i18next";


export const BookingSteps = () => {
  const { t } = useTranslation();

  // Get localized booking steps data
  const bookingStepsData = t("home.bookingStep.steps", { returnObjects: true });
  return (
    <Pannel className="flex flex-col gap-10">
      <div className="px-8">
        <Typography variant="h2" className="font-semibold text-start">
          {t("home.bookingStep.title")}
        </Typography>
        <Typography
          variant="h6"
          className="font-normal text-start mt-2 text-neutral-400"
        >
          {t("home.bookingStep.shortExp")}
        </Typography>
      </div>
      <div className="xl:px-24 md:space-y-2 space-y-5 w-full px-5 flex flex-col gap-16 justify-center items-center mt-5">
        {bookingStepsData?.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col justify-center items-center min-900:flex-row gap-10 w-full md:w-full ${
              step.reverse ? "min-900:flex-row-reverse" : ""
            }`}
          >
            {/* Background SVG Image */}
            <div className="relative">
              <img
                src="/assets/images/StepBack.png"
                height={100}
                width={130}
                className={`absolute -top-2 ${
                  step.reverse ? "md:right-2 md:-left-2" : "md:-left-3"
                }`}
              />

              {/* Foreground Content */}
              <div className="custom-border-shape overflow-hidden h-full md:h-64 w-full md:w-[400px] relative z-10">
                <img
                  src={step.image}
                  className="h-full w-full object-cover"
                  alt={step.title}
                />
              </div>
            </div>

            <div>
              <Typography
                variant="h2"
                className="leading-tight font-semibold"
              >
                {step.title}
              </Typography>
              <Typography variant="h6" className="mt-5 text-gray-600">
                {step.description}
              </Typography>
              {step.descriptionTwo && (
                <Typography variant="h6" className="mt-5 text-gray-600">
                  {step.descriptionTwo}
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>
    </Pannel>
  );
};
