"use client";
import React, { useState } from "react";

// Components and Others...
import { AnchorTag, Pannel, Typography } from "@/src/components";
import SignUpAsHotel from "./sections/signup-as-hotel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { paths } from "@/src/contants";
import Link from "next/link";

const SignUpScreen = () => {
  return (
    <Pannel className="flex justify-center items-center lg:justify-between gap-10 lg:gap-16 xl:gap-28 md:!py-10  !px-5 lg:!px-14 xl:!px-20 w-full h-full">
      <div className=" hidden lg:block w-full ">
        <LazyLoadImage
          src="/assets/images/signup.png"
          alt="img"
          width="100%"
          height="100%"
          effect="blur"
          className=" hidden lg:block w-full h-full object-cover"
        />
      </div>
      <div
        className={`flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 w-11/12 md:w-9/12 lg:w-full h-full mt-2 xl:mt-0`}
      >
        <Link href={paths.root}>
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/transperent-logo/transperent/PINK.png"
              alt="log"
              className=" w-16"
            />
            <Typography variant="h3" className="font-bold text-primary">
              Hotelbuuk
            </Typography>
          </div>
        </Link>
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
