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
    <Pannel className="flex flex-col gap-10  justify-center items-center bg-section-bg p-10 w-full">
      <div>
        <Typography variant="h2" className="text-center font-semibold w-full">
          Meet Our Partners
        </Typography>
        <Typography
          variant="h6"
          className="font-normal text-center mt-2 text-neutral-400"
        >
          Introducing the partners who help us elevate your stay
        </Typography>
      </div>

      <div className="w-full relative px-10">
        {/* Left Arrow Button */}
        <span
          className={`swiper-button-prev custom-prev ${isPrevDisabled ? "!opacity-50 !cursor-not-allowed" : ""}`}
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
          spaceBetween={20}
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
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          <div className="w-full flex">
            {SwiperCards.map((card) => (
              <SwiperSlide
                key={card.id}
                className="flex flex-col  relative w-fit"
              >
                <span className="relative ">
                  <div className="absolute rounded-3xl inset-0 bg-gradient-to-t from-black to-transparent via-black/15 opacity-75" />
                  <img
                    src={card.img}
                    alt={card.hotelName}
                    className="rounded-lg w-full"
                  />

                  <BgIcon
                    iconName="skill-icons:instagram"
                    className="absolute top-4 right-4"
                  />

                  <Typography
                    variant="h4"
                    className="absolute mt-2 font-semibold bottom-4 w-full z-30 text-center text-white "
                  >
                    {/* {card.hotelName} */}
                    Hotel Name
                  </Typography>
                </span>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </Pannel>
  );
});
