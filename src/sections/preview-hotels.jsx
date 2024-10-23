"use client";
import React from "react";

// Components and Others...
import { hotels } from "../_mock/_hotels";
import { HotelCard, Iconify } from "../components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import "../app/globals.css";

export const PreviewHotels = () => {
  return (
    <div className="w-full relative">
      {/* Left Arrow Button */}
      <span className="swiper-button-prev custom-prev absolute -left-3 bg-primary !h-8 !w-8 z-30 top-1/2 md:top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer text-black p-1">
        <Iconify iconName="cuida:arrow-left-outline" />
      </span>

      {/* Right Arrow Button */}
      <span className="swiper-button-next custom-next absolute -right-3 bg-primary !h-8 !w-8 z-30 top-1/2 md:top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer text-black p-1">
        <Iconify iconName="cuida:arrow-right-outline" />
      </span>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        <div className="w-full flex">
          {hotels?.map((item) => (
            <SwiperSlide key={item.id} className="flex flex-col">
              <HotelCard hotel={item} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};
