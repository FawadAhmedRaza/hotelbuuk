import Image from "next/image";
import React from "react";
import { Button, Pannel, Typography } from "../components";

export const HeroSection = React.memo(() => {
  return (
    <Pannel className=" relative flex justify-center items-center w-full h-screen bg-hero bg-center bg-no-repeat bg-cover -z-10 lg:py-40">
      <Image
        src="/assets/images/hero-bg.png"
        alt="bg"
        width={100}
        height={100}
        className="w-full h-screen absolute top-0 left-0 z-0"
      />

      <div className="flex flex-col justify-center lg:justify-start  gap-5  z-20 w-full h-full ">
        <Typography
          variant="h1"
          className="lg:!text-[3.3rem] text-white font-bold  shadow !custom-line capitalize "
        >
          <span className="heading-bg"> Book Hotels</span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold">
            Providing Knowledge-Driven Comfort for Business Leaders.
          </span>
        </Typography>
        <Typography
          variant="h5"
          className=" text-base sm:text-lg md:text-xl text-white tracking-widest font-normal shadow uppercase"
        >
          Stay. Learn. Lead.{" "}
        </Typography>
      </div>
    </Pannel>
  );
});
