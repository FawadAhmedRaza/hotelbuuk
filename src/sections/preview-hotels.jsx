"use client";
import React from "react";

// Components and Others...
import { hotels } from "../_mock/_hotels";
import { AnchorTag, Typography } from "../components";
import { BgIcon } from "../components/bg-icon";
import { paths } from "../contants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import "../app/globals.css";

export const PreviewHotels = () => {
  return (
    <div className="w-full relative ">
      <BgIcon
        iconName="cuida:arrow-left-outline"
        iconClass="!size-6"
        className="swiper-button-prev custom-prev absolute -left-5  md:-left-8 lg:-left-12 -mt-8 bg-primary size-8 z-30 top-1/2"
      />
      <BgIcon
        iconName="cuida:arrow-right-outline"
        iconClass="!size-6"
        className=" swiper-button-next custom-next absolute -right-5  md:-right-8  lg:-right-12 -mt-8 bg-primary size-8  z-30 top-1/2"
      />

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
        <div className="w-full flex ">
          {hotels?.map((item) => (
            <SwiperSlide key={item.id} className="flex flex-col ">
              <AnchorTag
                href={paths.getHotelById(item?.id)}
                className="relative w-full "
              >
                <div className="w-full h-auto relative ">
                  <img
                    src={item.imageUrl}
                    alt={item.hotelName}
                    className="w-full  h-auto "
                  />
                  <img
                    src="/assets/images/hotel-shadow.png"
                    alt={item.hotelName}
                    className="w-[96%] sm:w-[96%]  h-auto absolute top-0 left-2 "
                  />
                  <div className=" absolute top-0 w-full h-full flex flex-col gap-1.5 justify-center items-center">
                    <Typography
                      variant="h3"
                      className=" text-2xl md:text-3xl font-bold text-white uppercase text-center  font-lemonMilk "
                    >
                      {item.hotelName}
                    </Typography>
                    <Typography
                      variant="h3"
                      className=" text-2xl md:text-3xl font-bold text-white uppercase  font-lemonMilk  text-center"
                    >
                      {item.city}
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-normal text-white -mt-2 text-center"
                    >
                      {item.country}
                    </Typography>
                  </div>
                  <div className=" absolute  bottom-2 left-8 w-full h-full flex flex-col  justify-end items-start pb-5 ">
                    <Typography
                      variant="p"
                      className=" !text-base font-semibold text-white  "
                    >
                      {item.price} / Per Night
                    </Typography>
                    <Typography
                      variant="p"
                      className=" !text-base font-semibold text-white  "
                    >
                      {item.guestType}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-1 px-2">
                  <Typography variant="p" className="font-bold">
                    {item.eventTopic}
                  </Typography>
                  <Typography variant="p" className="font-normal">
                    {item.location}
                  </Typography>
                  <Typography variant="p" className="font-medium">
                    {item.dateRange}
                  </Typography>
                </div>
                <BgIcon
                  iconName="solar:heart-outline"
                  iconClass="text-white"
                  className="bg-primary absolute top-4 right-6 sm:right-8"
                />
              </AnchorTag>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};
