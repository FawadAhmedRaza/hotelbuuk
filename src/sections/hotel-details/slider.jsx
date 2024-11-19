"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required Swiper modules
import { Pagination } from "swiper/modules";
import ImageRender from "@/src/components/ImageRenderer";

export const Slider = ({ images }) => {
  return (
    <div className="lowercase sm:hidden ">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper relative rounded-xl !w-full h-80 "
      >
        {images?.map((image, index) => (
          <SwiperSlide key={image.id} className="relative !w-full !h-full ">
            <div className="absolute bottom-5 right-4">
              <span className="py-2 px-3 rounded-lg bg-primary text-white text-normal">
                {`${index + 1} / ${images.length}`}
              </span>
            </div>
            {/* <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full object-cover"
            /> */}
            <ImageRender
              src={image.img}
              type={"server"}
              alt={`Uploaded Image `}
              className="h-full w-full object-cover "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
