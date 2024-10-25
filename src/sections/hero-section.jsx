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
        <div className=" !text-[3rem] md:!text-[4.4rem] text-white font-bold  shadow !custom-line uppercase ">
          <span className=" text-white ">
            <span className=" bg-[#bd2c94bb] text-opacity-80  text-[#ffffffea] px-3 rounded-md">
              stay
            </span>
            <br /> for business insights
          </span>
          {/* <span className=""></span> */}
        </div>
        <Typography variant="p" className="  text-white  ">
          Book hotels that offer analysis of business destinations.
        </Typography>
      </div>
    </Pannel>
  );
});
