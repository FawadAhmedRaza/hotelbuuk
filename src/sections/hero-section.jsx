import Image from "next/image";
import React from "react";
import { Button, Pannel, Typography } from "../components";
import { Booking } from ".";

export const HeroSection = React.memo(() => {
  return (
    <Pannel className="   w-full h-screen bg-hero bg-center bg-no-repeat bg-cover  py-10 pt-40  md:py-40">
      <div className="flex justify-center items-center h-full md:h-fit">
        <Image
          src="/assets/images/hero-bg.png"
          alt="bg"
          width={100}
          height={100}
          className="w-full h-screen absolute top-0 left-0 z-10 "
        />

        <div className="flex flex-col  justify-center lg:justify-start gap-5 z-10 w-full h-full  ">
          <div className=" !text-[3rem] md:!text-[3.8rem] text-white font-bold uppercase  !custom-line  font-poppins  ">
            <span className=" bg-[#bd2c94bb] text-opacity-80 text-[#ffffffea] px-3 rounded-md ">
              Stay
            </span>
            <br /> For Business Insights
          </div>
          <Typography variant="h5" className="  text-white  !font-helvetica ">
            Our partner hotels offer business tours and market insights to
            business leaders
          </Typography>
        </div>
      </div>
      <div className=" relative mt-10 ">
        <div className="absolute left-0 right-0 hidden md:flex justify-center z-10 ">
          <Booking />
        </div>
      </div>
    </Pannel>
  );
});
