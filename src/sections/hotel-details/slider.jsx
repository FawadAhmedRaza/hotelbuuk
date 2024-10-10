"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required Swiper modules
import { Pagination } from "swiper/modules";

export const Slider = ({ images }) => {
  return (
    <div className="lowercase md:hidden ">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper relative rounded-xl"
      >
        {/* <div className="absolute  left-4 top-5 z-20">
          <span className="w-full py-2 px-3 rounded-full bg-gray-100 text-gray-900 text-xs">
            in-room work desk
          </span>
        </div> */}
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative ">
            <div className="absolute bottom-5 right-4">
              <span className="py-2 px-3 rounded-lg bg-primary text-white text-normal">
                {`${index + 1} / ${images.length}`}
              </span>
            </div>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
