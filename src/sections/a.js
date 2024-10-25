"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Button, Card, Pannel, Typography } from "../components";
import { BgIcon } from "../components/bg-icon";

export const BusinessFacts = () => {
  const [count] = useState(Array.from({ length: 9 }, (_, index) => index));

  return (
    <Pannel className="flex flex-col gap-5 items-center !pt-10 relative !overflow-hidden !px-8 sm:!px-10 lg:!px-12 md:!px-12">
      <Typography
        variant="h1"
        className="font-semibold !text-black text-center"
      >
        Business Facts
      </Typography>

      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: false,
            pagination: {
              enabled: true,
            },
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
            navigation: false,
            pagination: {
              enabled: true,
            },
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 20,
            navigation: true,
            pagination: false,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 15,
            navigation: true,
            pagination: false,
          },
        }}
        className="w-full px-2 py-3 overflow-hidden"
      >
        {count.map((item) => (
          <SwiperSlide key={item}>
            <Card className="flex flex-col gap-3 p-4 shadow-md">
              <div className="relative w-full h-36">
                <Image
                  src="/assets/images/privacy-policy.png"
                  alt="Business Fact"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="h4" className="font-semibold">
                  Shanghai Electronic Market Tour
                </Typography>
                <Typography variant="body2">
                  A visit to CyberMart Market
                </Typography>
                <Typography variant="body2">A visit to Taobao HQ</Typography>
                <Typography variant="h6" className="font-medium">
                  $20 for 3 Days Per guest
                </Typography>
                <Button className="w-full mt-2 bg-black">Ask John</Button>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination" />

      <BgIcon
        iconName="mingcute:left-fill"
        iconClass="!size-4"
        className="swiper-button-prev custom-prev sm:flex hidden absolute left-0 md:left-3 lg:left-3 bg-black size-8 z-50 top-[60%] transform -translate-y-1/2 cursor-pointer"
      />

      <BgIcon
        iconName="mingcute:right-fill"
        iconClass="!size-4"
        className="swiper-button-next custom-next sm:flex hidden right-0 md:right-3 lg:right-3 bg-black size-8 z-50 top-[60%] transform -translate-y-1/2 cursor-pointer"
      />
    </Pannel>
  );
};

export default BusinessFacts;
