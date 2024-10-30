"use client";
import React from "react";

import { ShadcnCard, CardContent } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { SwiperCards } from "@/src/_mock/_swiper";
import { BgIcon, Typography } from "..";

export function ShadCnCarousel() {
  return (
    <Carousel className="px-5">
      <CarouselContent className="-ml-1">
        {SwiperCards.map((card, index) => (
          <CarouselItem key={index} className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
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
  );
}
