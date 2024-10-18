"use client";
import React, { useState } from "react";

// Components and Others...
import { Pannel, Typography } from "@/src/components";
import SignUpAsHotel from "./sections/signup-as-hotel";

const SignUpScreen = () => {
  return (
    <Pannel className="flex justify-center items-center lg:justify-between gap-10 lg:gap-16 xl:gap-28 md:!py-10  !px-5 lg:!px-14 xl:!px-20 w-full h-full">
      <img
        src="/assets/images/signup.png"
        alt="img"
        className=" hidden lg:block w-[400px]  xl:w-[500px] h-full"
      />
      <div
        className={`flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 w-11/12 md:w-9/12 lg:w-full h-full mt-2 xl:mt-0`}
      >
        <Typography variant="h3" className="font-bold text-primary">
          Hotelbuuk
        </Typography>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-3">
          <Typography variant="h2" className="font-semibold">
            Sign up
          </Typography>
          <Typography
            variant="p"
            className="text-secondary  text-center lg:text-start "
          >
            Setup your account to access hundreds of business hotels
          </Typography>
        </div>
        <div className="w-full">
          <SignUpAsHotel />
        </div>
      </div>
    </Pannel>
  );
};

export default SignUpScreen;
