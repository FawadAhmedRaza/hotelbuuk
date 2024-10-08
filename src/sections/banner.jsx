import React from "react";
import { Button, Pannel, Typography } from "../components";

export const Banner = React.memo(() => {
  return (
    <div className="flex items-center  bg-banner bg-contain bg-center bg-no-repeat w-full h-96 mb-20">
      <Pannel className="flex w-full items-center gap-3 h-full">
        <div className="flex flex-col justify-center gap-6 h-full w-full grow">
          <Typography
            variant="h3"
            className="font-semibold text-white !leading-50ld"
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
