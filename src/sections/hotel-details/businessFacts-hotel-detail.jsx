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
import { Button, Card, Iconify, Pannel, Typography } from "@/src/components";
import { BgIcon } from "@/src/components/bg-icon";

export const BusinessFactsHotelDetail = () => {
  const [count] = useState(Array.from({ length: 9 }, (_, index) => index));
  const swiperRef = React.useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = React.useState(true);
  const [isNextDisabled, setIsNextDisabled] = React.useState(false);

  const updateNavigation = () => {
    if (swiperRef.current) {
      const { isBeginning, isEnd } = swiperRef.current.swiper;

      setIsPrevDisabled(isBeginning); // Disable left button if at the beginning
      setIsNextDisabled(isEnd); // Disable right button if at the end
    }
  };

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef?.current?.navigation?.update();
    }
  }, [swiperRef]);

  return (
    <Pannel className="flex flex-col gap-5 items-center  !pt-10 relative !overflow-hidden !px-12">
      {/* Heading */}
      <Typography
        variant="h1"
        className="font-semibold !text-black text-center"
      >
        Business Facts
      </Typography>
      {/* Left Arrow Button */}
      <span
        className={`swiper-button-prev custom-prev ${
          isPrevDisabled ? "!opacity-50 !cursor-not-allowed" : ""
        }`}
        onClick={() => {
          swiperRef.current?.swiper?.slidePrev();
          updateNavigation();
        }}
        aria-disabled={isPrevDisabled}
      >
        <Iconify iconName="cuida:arrow-left-outline" />
      </span>

      {/* Right Arrow Button */}
      <span
        className={`swiper-button-next custom-next ${
          isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => {
          swiperRef.current?.swiper?.slideNext();
          updateNavigation();
        }}
      >
        <Iconify iconName="cuida:arrow-right-outline" />
      </span>

      <Swiper
        ref={swiperRef}
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
        className="w-full  py-3  overflow-hidden px-10 "
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
