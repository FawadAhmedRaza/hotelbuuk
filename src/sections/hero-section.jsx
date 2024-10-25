import Image from "next/image";
import React from "react";
import { Button, Pannel, Typography } from "../components";
import { Booking } from ".";

export const HeroSection = React.memo(() => {
  return (
    <Pannel className=" relative  w-full h-screen bg-hero bg-center bg-no-repeat bg-cover  py-10 pt-32  md:py-40">
      <div className="flex justify-center items-center">
        <Image
          src="/assets/images/hero-bg.png"
          alt="bg"
          width={100}
          height={100}
          className="w-full h-screen absolute top-0 left-0 z-10 "
        />

        <div className="flex flex-col  justify-center lg:justify-start   gap-5  z-10 w-full h-full  ">
          <div className=" !text-[3rem] md:!text-[4.2rem] text-white font-bold  shadow !custom-line uppercase ">
            <span className=" text-white ">
              <span className=" bg-[#bd2c94bb] text-opacity-80  text-[#ffffffea] px-3 rounded-md">
                stay
              </span>
              <br /> for business insights
            </span>
            {/* <span className=""></span> */}
          </div>
          <Typography variant="p" className="  text-white  ">
            Our partner hotels offer business tours and market insights to
            business leaders
          </Typography>
        </div>
      </div>
      <div className="absolute left-0 right-0 flex justify-center absoluter w-full bottom-0  mb-4 z-10 ">
        <Booking />
      </div>
    </Pannel>
  );
});
