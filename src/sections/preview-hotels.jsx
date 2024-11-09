"use client";
import React, { useEffect, useState } from "react";
import { HotelCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import HotelCardSkeleton from "../components/Skeleton/hotel-card-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { getAllEvents } from "../redux/all-events/thunk";

export const 
PreviewHotels = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.allEvents);

  const [isEventLoading, setIsEventLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsEventLoading(true);
      try {
        await dispatch(getAllEvents()).unwrap();
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsEventLoading(false);
      }
    };

    fetchEvents();
  }, [dispatch]);

  return (
    <div className="w-full relative">
      {isLoading || isEventLoading ? (
        <Carousel className="px-3">
          <CarouselContent>
            {[...Array(4)].map((_, index) => (
              <CarouselItem
                key={index}
                className=" pl-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <HotelCardSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <Carousel className="px-3">
          <CarouselContent>
            {events?.map((event) => (
              <CarouselItem
                key={event?.id}
                className="pl-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-0 ">
                  <HotelCard event={event} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};
