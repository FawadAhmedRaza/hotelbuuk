"use client";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getHotelInfo } from "../redux/hotel-info/thunk";
import ImageRender from "../components/ImageRenderer";
import { useTranslation } from "react-i18next";

export const MeetOurPatners = React.memo(() => {
  const dispatch = useDispatch();
  const swiperRef = React.useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isHotelLoading, setIsHotelLoading] = useState(true);
  const {t} = useTranslation()
  const { hotels, isLoading } = useSelector((state) => state.hotelInfo);

  console.log(hotels);

  const updateNavigation = () => {
    if (swiperRef.current) {
      const { isBeginning, isEnd } = swiperRef.current.swiper;

      setIsPrevDisabled(isBeginning); // Disable left button if at the beginning
      setIsNextDisabled(isEnd); // Disable right button if at the end
    }
  };

  useEffect(() => {
    async function fetchHotels() {
      try {
        await dispatch(getHotelInfo()).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    fetchHotels();
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef?.current?.navigation?.update();
    }
  }, [swiperRef]);

  return (
    <Pannel className="flex flex-col gap-10   bg-white p-10 w-full">
      <div>
        <Typography variant="h2" className="text-start font-semibold w-full">
          {t("home.meetOurPartner.title")}
        </Typography>
        <Typography
          variant="h6"
          className="font-normal text-start mt-2 text-neutral-400"
        >
          {t("home.meetOurPartner.shortDes")}
        </Typography>
      </div>

      <div className="w-full">
        <Carousel className="px-5">
          <CarouselContent className="-ml-1">
            {hotels.map((hotel) => (
              <CarouselItem
                key={hotel.id}
                className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="px-2">
                  <ShadcnCard className="p-0 overflow-hidden rounded-3xl">
                    {/* <CardContent className="flex items-center justify-center h-52"> */}
                    <span className="relative w-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent via-black/15 opacity-75" />
                      {/* <img
                        src={card.img}
                        alt={card.hotelName}
                        className=" w-full"
                      /> */}
                      <BgIcon
                        iconName="skill-icons:instagram"
                        className="absolute top-4 right-4 z-20"
                      />
                      <ImageRender
                        src={hotel?.hotel_image}
                        type={"server"}
                        alt={`Uploaded Image `}
                        ratio="4/3"
                        delayTime={300}
                        threshold={200}
                        effect="opacity"
                        wrapperProps={{
                          style: { transitionDelay: "0.5s" },
                        }}
                        className="h-72 w-full object-cover rounded-3xl  !event-card-shadow"
                      />
                      <Typography
                        variant="h5"
                        className="absolute bottom-4 w-full z-30 text-center text-white font-semibold mt-2"
                      >
                        {hotel.hotel_name}
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
