import React from "react";
import { Card, Pannel, Typography } from "../components";
import { BookingStepsData } from "../_mock/_booking-steps";

export const BookingSteps = () => {
  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center bg-white">
      <Typography variant="h3" className="font-semibold">
        Book in 3 Simple Steps
      </Typography>
      <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
        {BookingStepsData?.map((item) => (
          <Card
            className=" flex flex-col sm:flex-row lg:flex-col justify-start gap-3 w-full sm:h-full  lg:h-96"
            key={item?.id}
          >
            <img src={item?.img} alt="img" className=" w-44 sm:w-auto" />
            <span className=" flex flex-col justify-start gap-1 sm:gap-3 ">
              <Typography variant="h4" className="font-semibold text-center sm:text-start lg:text-center">
                {item?.title}
              </Typography>
              <Typography variant="p" className=" text-center sm:text-start lg:text-center text-secondary">
                {item?.description}
              </Typography>
            </span>
          </Card>
        ))}
      </div>
    </Pannel>
  );
};
