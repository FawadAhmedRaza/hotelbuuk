"use client";
import React, { useEffect, useRef, useState } from "react";

// Components and Others...
import { hotels } from "../_mock/_hotels";
import {
  AnchorTag,
  BgIcon,
  HotelCard,
  Iconify,
  Typography,
} from "../components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../app/globals.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllNomadEvents } from "../redux/events/thunk";
import { getAllEvents } from "../redux/all-events/thunk";

export const PreviewHotels = () => {
  const swiperRef = React.useRef(null);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const dispatch = useDispatch();

  const { events, isLoading } = useSelector((state) => state.allEvents);

  const updateNavigation = () => {
    if (swiperRef.current) {
      const { isBeginning, isEnd } = swiperRef.current.swiper;

      setIsPrevDisabled(isBeginning); // Disable left button if at the beginning
      setIsNextDisabled(isEnd); // Disable right button if at the end
    }
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef?.current?.navigation?.update();
    }
  }, [swiperRef]);

  useEffect(() => {
    async function fetchEvents() {
      await dispatch(getAllEvents()).unwrap();
    }

    fetchEvents();
  }, []);

  return (
    <div className="w-full relative px-10">
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
        slidesPerView={4}
        modules={[Navigation]}
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
        {!isLoading &&
          events?.map((event) => (
            <SwiperSlide key={event.id} className="flex flex-col">
              <HotelCard event={event} className="" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

