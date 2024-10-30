"use client";

// Components and Others...
import { hotels } from "../_mock/_hotels";
import {
  AnchorTag,
  BgIcon,
  Typography,
} from "../components";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { ShadcnCard } from "../components/ui/card";
import { paths } from "../contants";
import { cn } from "@/lib/utils";

export const PreviewHotels = () => {

  return (
    <div className="w-full relative ">
      <Carousel className="  w-full px-0">
        <CarouselContent className="-ml-1">
          {hotels?.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-5 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
            >
              <div className="">
                <ShadcnCard className="p-0 overflow-hidden rounded-3xl bg-transparent shadow-none">
                  <AnchorTag
                    href={paths?.hotels?.getHotelById(item?.id)}
                    className={cn("relative w-full !text-black")}
                  >
                    <div className="w-full h-auto relative">
                      <img
                        src={item.imageUrl}
                        alt={item.hotelName}
                        className="w-full h-auto"
                      />
                      <img
                        src="/assets/images/hotel-shadow.png"
                        alt={item.hotelName}
                        className="w-[96%] sm:w-[96%] h-auto absolute top-0 left-2"
                      />
                      <div className="absolute top-0 w-full h-full flex flex-col gap-1.5 justify-center hotels-center">
                        <Typography
                          variant="h3"
                          className="!text-2xl !md:text-3xl font-bold text-white uppercase text-center font-lemonMilk"
                        >
                          {item.hotelName}
                        </Typography>
                        <Typography
                          variant="h3"
                          className="!text-2xl !md:text-3xl font-bold text-white uppercase font-lemonMilk text-center"
                        >
                          {item.city}
                        </Typography>
                        <Typography
                          variant="h4"
                          className="font-normal text-white mt-2 text-center"
                        >
                          {item.country}
                        </Typography>
                      </div>
                      <div className="absolute bottom-2 left-8 w-full h-full flex flex-col justify-end hotels-start pb-5">
                        <Typography
                          variant="p"
                          className="!text-base font-semibold text-white font-dmSans"
                        >
                          {item.price} / Per Night
                        </Typography>
                        <Typography
                          variant="p"
                          className="!text-base font-semibold text-white font-dmSans"
                        >
                          {item.guestType}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex flex-col  mt-1 px-2 !font-dmSans">
                      <Typography variant="h6" className="font-bold ">
                        {item.eventTopic}
                      </Typography>
                      <Typography variant="p" className="font-normal">
                        {item.location}
                      </Typography>
                      <Typography
                        variant="p"
                        className=" !text-sm font-medium text-neutral-400 mt-1"
                      >
                        {item.dateRange}
                      </Typography>
                    </div>
                    <BgIcon
                      iconName="solar:heart-outline"
                      iconClass="text-white"
                      className="bg-primary absolute top-4 right-6 "
                    />
                  </AnchorTag>
                </ShadcnCard>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  className=" -left-5"/>
        <CarouselNext className="-right-8" />
      </Carousel>
    </div>
  );
};

