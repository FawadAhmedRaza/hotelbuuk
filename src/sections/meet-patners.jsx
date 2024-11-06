"use client";
import React, { useEffect, useState } from "react";
import {  Pannel, Typography } from "../components";
import { BgIcon } from "../components/bg-icon";

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
import MeetPartnerSkeleton from "../components/Skeleton/meet-partner-skeleton";

export const MeetOurPatners = () => {
  const dispatch = useDispatch();

  const { hotels, isLoading } = useSelector((state) => state.hotelInfo);
  const [isHotelLoading, setIsHotelLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setIsHotelLoading(true);
      try {
        setIsHotelLoading(true);
        await dispatch(getHotelInfo()).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setIsHotelLoading(false);
      }
    };

    fetchHotels();
  }, [dispatch]);

  return (
    <Pannel className="flex flex-col gap-10   bg-white p-10 w-full">

      <div>
        <Typography variant="h2" className="text-start font-semibold w-full">
          Meet Our Partners
        </Typography>
        <Typography
          variant="h6"
          className="font-normal text-start mt-2 text-neutral-400"
        >
          Introducing the partners who help us elevate your stay
        </Typography>
      </div>

      {isLoading ? (
        <Carousel className="px-3">
          <CarouselContent>
            {[...Array(7)].map((_, index) => (
              <CarouselItem
                key={index}
                className=" pl-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <MeetPartnerSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
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
                      <div className="relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent via-black/15 opacity-75" />

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
                      </div>
                    </ShadcnCard>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
      
    </Pannel>
  );
};
