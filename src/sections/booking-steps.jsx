import React from "react";
import { Card, Pannel, Typography } from "../components";
import Image from "next/image";

export const BookingSteps = () => {
  return (
    <Pannel className="flex flex-col gap-16 justify-center items-center ">
      <Typography variant="h2" className="font-semibold text-center">
        Book in 3 Simple Steps
      </Typography>
      <div className="   xl:px-10 md:space-y-0 space-y-5  w-full px-5 flex flex-col gap-10 justify-center items-center mt-5">
        <div className=" flex  flex-col justify-center min-900:justify-start items-center  min-900:flex-row gap-10 w-full  md:w-[90%]">
          <div className="relative ">
            {/* SVG Background Image */}
            <Image
              src={"/assets/images/step-back.svg"}
              height={100}
              width={130}
              className="absolute -top-3 -left-1 md:-left-3 " // Lower z-index for background
            />

            {/* Foreground Content */}
            <div className="custom-border-shape overflow-hidden h-full md:h-56  w-full md:w-96 relative z-10">
              <img
                src={"/assets/images/bedroom.png"}
                className="h-full w-full object-fill"
              />
            </div>
          </div>

          <div>
            <Typography variant="h3" className=" mt-2 md:mt-5">
              Free internet and utility setup!
            </Typography>
            <Typography variant="p" className=" mt-3">
              Our Connect team specializes in making your life easier after
              you're matched with your new apartment. Get hooked up with the
              best rates on utilities, insurance, and all the services you need
              for a stress-free move.
            </Typography>
          </div>
        </div>

        <div className=" flex  flex-col justify-center min-900:justify-start items-center  min-900:flex-row-reverse gap-10 w-full  md:w-[90%]">
          <div className="relative ">
            {/* SVG Background Image */}
            <Image
              src={"/assets/images/step-back.svg"}
              height={100}
              width={130}
              className="absolute -top-3 md:left-3 md:-right-3 " // Lower z-index for background
            />

            {/* Foreground Content */}
            <div className="custom-border-shape overflow-hidden h-full md:h-56  w-full md:w-96 relative z-10">
              <img
                src={"/assets/images/bedroom.png"}
                className="h-full w-full object-fill"
              />
            </div>
          </div>

          <div>
            <Typography variant="h3" className=" t-3 md:mt-5 ">
              Free internet and utility setup!
            </Typography>
            <Typography variant="p" className=" mt-3">
              Our Connect team specializes in making your life easier after
              you're matched with your new apartment. Get hooked up with the
              best rates on utilities, insurance, and all the services you need
              for a stress-free move.
            </Typography>
          </div>
        </div>

        <div className=" flex  flex-col justify-center min-900:justify-start items-center  min-900:flex-row gap-10 w-full  md:w-[90%]">
          <div className="relative ">
            {/* SVG Background Image */}
            <Image
              src={"/assets/images/step-back.svg"}
              height={100}
              width={130}
              className="absolute -top-3 -left-1 md:-left-3 " // Lower z-index for background
            />

            {/* Foreground Content */}
            <div className="custom-border-shape overflow-hidden h-full md:h-56  w-full md:w-96 relative z-10">
              <img
                src={"/assets/images/bedroom.png"}
                className="h-full w-full object-fill"
              />
            </div>
          </div>

          <div>
            <Typography variant="h3" className=" mt-2 md:mt-5">
              Free internet and utility setup!
            </Typography>
            <Typography variant="p" className=" mt-3">
              Our Connect team specializes in making your life easier after
              you're matched with your new apartment. Get hooked up with the
              best rates on utilities, insurance, and all the services you need
              for a stress-free move.
            </Typography>
          </div>
        </div>
      </div>
    </Pannel>
  );
};
