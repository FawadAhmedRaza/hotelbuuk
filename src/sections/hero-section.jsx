"use client";
import Image from "next/image";
import React from "react";
import { Button, Pannel, Typography } from "../components";
import { Booking } from ".";
import { useTranslation } from "react-i18next";

export const HeroSection = React.memo(() => {
  const {t} = useTranslation()
  return (
    <Pannel className=" relative  w-full h-[80vh] sm:h-[75vh] bg-hero bg-center bg-no-repeat bg-cover  py-10 pt-40  md:py-40">
      <div className="flex justify-center items-center h-full md:h-fit">
        <Image
          src="/assets/images/hero-bg.png"
          alt="bg"
          width={100}
          height={100}
          className="w-full h-[75vh] absolute top-0 left-0 z-10 "
        />

        <div className="flex flex-col  justify-center lg:justify-start gap-5 z-10 w-full h-full  ">
          <div className=" !text-[3rem] md:!text-[3.3rem] text-white font-bold uppercase  !custom-line  font-poppins  ">
            <span className=" bg-[#bd2c94bb] text-opacity-80 text-[#ffffffea] px-3 rounded-md ">
              {t('home.hero.stay')}
            </span>
            <br /> {t('home.hero.heading')}
          </div>
          <Typography
            variant="h6"
            className="  text-white  !font-helvetica  sm:mt-0 -mt-2"
          >
           {t("home.hero.description")}
          </Typography>
        </div>
      </div>
      {/* <div className="   "> */}
      <div className="absolute left-0 -bottom-8 right-0 hidden md:flex justify-center z-10 ">
        <Booking />
      </div>
      {/* </div> */}
    </Pannel>
  );
});
