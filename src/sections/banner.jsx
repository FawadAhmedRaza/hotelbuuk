import React from "react";
import { Button, Pannel, Typography } from "../components";

export const Banner = React.memo(() => {
  return (
    <div className="flex items-center  bg-banner bg-cover bg-center bg-no-repeat w-full h-80">
      <Pannel className="flex flex-col md:flex-row w-full items-center sm:gap-3 h-full">
        <div className="flex flex-col justify-center items-center md:items-start gap-3 lg:gap-6 h-full w-full grow">
          <Typography
            variant="h3"
            className="font-semibold text-white md:!leading-50ld"
          >
            Are you taking your business <br /> or opening a new branch abroad?
          </Typography>
          <Typography variant="h6" className="text-white">
            Find hotels with in-house consultants to walk you through.
          </Typography>
        </div>
        <Button>Book Now</Button>
      </Pannel>
    </div>
  );
});
