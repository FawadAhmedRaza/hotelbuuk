import React from "react";
import { Card, Pannel, Typography } from "../components";
import Image from "next/image";

const bookingStepsData = [
  {
    id: 3,
    title: "Seamless Booking Experience  ",
    description:
      "Guests receive curated options for business tours relevant to their industry with detailed insights on local industries, tour agendas, and networking opportunities.",
    image: "/assets/images/imgthree.jpg",
    reverse: false,
  },

  {
    id: 2,
    title: "Personalized Itinerary and Pre-Tour Insights",
    description:
      "During tours, guests get personalized itinerary and in-depth insights on key industry trends, consumer behavior, and the relevant local markets.",

    descriptionTwo:
      "Guests can access market overviews and industry analysis to prepare for valuable engagements.",
    image: "/assets/images/imgtwo.jpg",
    reverse: true,
  },

  {
    id: 1,
    title: "Effortless Check-In and Tour Assistance ",
    description:
      "At check-in, our consultants are ready to help you settle in, access relevant resources and contact exchanges to deepen networking and understanding of the markets, thereby maximizing the business potential of each experience.",

    image: "/assets/images/imgone.jpg",
    reverse: false,
  },
];

const loaderProp = ({ src }) => {
  return src;
};

export const BookingSteps = () => {
  return (
    <Pannel className="flex flex-col gap-10">
      <div className="px-8">
        <Typography variant="h2" className="font-semibold text-start">
          What to expect
        </Typography>
        <Typography
          variant="h6"
          className="font-normal text-start mt-2 text-neutral-400"
        >
          we'll exceed your high expectations
        </Typography>
      </div>
      <div className="xl:px-24 md:space-y-2 space-y-5 w-full px-5 flex flex-col gap-16 justify-center items-center mt-5">
        {bookingStepsData.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col justify-center items-center min-900:flex-row gap-10 lg:gap-60 w-full md:w-full ${
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
                variant="h3"
                className="  leading-tight font-semibold"
              >
                {step.title}
              </Typography>
              <Typography variant="h6" className="mt-5 text-gray-600 ">
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
