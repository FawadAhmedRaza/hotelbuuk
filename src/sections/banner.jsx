import React from "react";
import { AnchorTag, Button, Pannel, Typography } from "../components";
import { paths } from "../contants";

export const Banner = React.memo(() => {
  return (
    <Pannel className="flex flex-col md:flex-row w-full items-center gap-10 md:gap-3 h-full ">
      <div className="flex flex-col justify-center items-center md:items-start gap-3 lg:gap-6 h-full w-full grow">
        <Typography
          variant="h3"
          className="font-semibold  md:!leading-50ld text-center sm:text-start"
        >
          Are you taking your business abroad <br className=" hidden md:block"/> or opening a new branch?
        </Typography>
        <Typography variant="h6" className=" text-center sm:text-start">
          Find hotels with in-house consultants to walk you through.
        </Typography>
        <AnchorTag href={paths.auth.signUp}>
          <Button>Signup Now</Button>
        </AnchorTag>
      </div>
      <div className="custom-border-shape overflow-hidden h-full sm:h-72  w-full sm:w-[600px] relative z-10">
        <img
          src="/assets/images/hotel.jpg"
          className="h-full w-full object-cover"
        />
      </div>
    </Pannel>
  );
});
