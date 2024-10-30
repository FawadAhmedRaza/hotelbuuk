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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { ShadcnCard } from "../components/ui/card";

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

      <div className="w-full">


        <Carousel className="px-5">
          <CarouselContent className="-ml-1">
            {SwiperCards.map((card, index) => (
              <CarouselItem
                key={index}
                className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="px-2">
                  <ShadcnCard className="p-0 overflow-hidden rounded-3xl">
                    {/* <CardContent className="flex items-center justify-center h-52"> */}
                    <span className="relative w-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent via-black/15 opacity-75" />
                      <img
                        src={card.img}
                        alt={card.hotelName}
                        className=" w-full"
                      />
                      <BgIcon
                        iconName="skill-icons:instagram"
                        className="absolute top-4 right-4"
                      />
                      <Typography
                        variant="h4"
                        className="absolute bottom-4 w-full z-30 text-center text-white font-semibold mt-2"
                      >
                        {card.hotelName}
                      </Typography>
                    </span>
                    {/* </CardContent> */}
                  </ShadcnCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Pannel>
  );
});
