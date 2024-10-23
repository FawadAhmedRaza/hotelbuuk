"use client";
import React from "react";

// Components and Others...
import { Swiper, SwiperSlide } from "swiper/react";
import { Iconify, Pannel, Typography } from "../components";
import { SwiperCards } from "../_mock/_swiper";
import { BgIcon } from "../components/bg-icon";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import "../app/globals.css";

export const MeetOurPatners = React.memo(() => {
  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center bg-section-bg p-10">
      <Typography variant="h3" className="font-semibold">
        Meet Our Partners
      </Typography>

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
          spaceBetween={30}
          slidesPerView={4}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev", // Fix: properly target the prev element
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          <div className="w-full flex">
            {SwiperCards.map((card) => (
              <SwiperSlide
                key={card.id}
                className="flex flex-col  relative w-fit"
              >
                <span className="relative">
                  <img
                    src={card.img}
                    alt={card.hotelName}
                    className="rounded-lg w-full"
                  />
                  <BgIcon
                    iconName="skill-icons:instagram"
                    className="absolute bottom-4 right-4"
                  />
                </span>
                <Typography
                  variant="h3"
                  className="mt-4 font-medium z-10 text-center"
                >
                  {card.hotelName}
                </Typography>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </Pannel>
  );
});
