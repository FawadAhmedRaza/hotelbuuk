"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import Navigation and Pagination modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Assuming you have Button, Card, and Typography components defined elsewhere
import { Button, Card, Pannel, Typography } from "@/src/components";
import { BgIcon } from "@/src/components/bg-icon";

export const BusinessFactsHotelDetail = () => {
  // Example data, can be fetched or updated later.
  const [count] = useState(Array.from({ length: 9 }, (_, index) => index));

  return (
    <Pannel className="flex flex-col gap-5 items-center  !pt-10 relative !overflow-hidden !px-12">
      {/* Heading */}
      <Typography
        variant="h1"
        className="font-semibold !text-black text-center"
      >
        Business Facts
      </Typography>

      <BgIcon
        iconName="cuida:arrow-left-outline"
        iconClass="!size-4"
        className="swiper-button-prev custom-prev absolute left-0 md:left-3 lg:left-3   bg-black size-8 z-50 top-[60%] transform -translate-y-1/2 cursor-pointer"
      />

      <BgIcon
        iconName="cuida:arrow-right-outline"
        iconClass="!size-4"
        className="swiper-button-next custom-next absolute right-0 md:right-3 lg:right-3 bg-black size-8 z-50 top-[60%] transform -translate-y-1/2 cursor-pointer"
      />

      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
              enabled: true,
            },
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
            pagination: {
              enabled: true,
            },
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 20,
            pagination: false,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 15,
            pagination: false,
          },
        }}
        className="w-full px-2  py-3  overflow-hidden "
      >
        {count.map((item) => (
          <SwiperSlide key={item}>
            <Card className="flex flex-col gap-3 p-4 shadow-md">
              {/* Image */}
              <div className="relative w-full h-36">
                <Image
                  src="/assets/images/privacy-policy.png" // Replace with your image path
                  alt="Business Fact"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <Typography variant="h4" className=" font-semibold">
                  Shanghai Electronic Market Tour
                </Typography>
                <Typography variant="body2">
                  A visit to CyberMart Market
                </Typography>
                <Typography variant="body2">A visit to Taobao HQ</Typography>
                <Typography variant="h6" className="font-medium">
                  $20 for 3 Days Per guest
                </Typography>
                <Button className="w-full  mt-2 bg-black">Ask John</Button>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination" />
    </Pannel>
  );
};

export default BusinessFactsHotelDetail;
