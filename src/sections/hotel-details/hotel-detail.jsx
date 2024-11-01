"use client";

import React from "react";

import { useSelector } from "react-redux";

import { Accordion, Card, Typography } from "@/src/components";
import { HotelBio } from "./hotel-bio";
import { HostBio } from "./host-bio";

export const HotelDetail = () => {
  const { event } = useSelector((state) => state.allEvents.getById);

  return (
    <div className="flex flex-col justify-between md:py-10 !pt-4  px-5 sm:px-8 lg:px-14 xl:px-10 ">
      <Typography
        variant="h3"
        className="font-medium text-xl md:text-2xl mb-5 text-gray-600"
      >
        Refresh your mind before your business meetings
      </Typography>
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-3 ">
        <div className=" flex flex-col gap-5 h-full w-full ">
          <div className="flex flex-col gap-3">
            <Typography
              variant="h3"
              className="font-medium text-xl md:text-[] "
            >
              What you'll learn
            </Typography>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Card className="flex flex-col gap-3  w-full p-5">
              {event?.event_topics?.map((item, index) => (
                <Accordion
                  key={item.id}
                  title={item?.title}
                  isOpen={index === 0}
                >
                  <Typography variant="p">{item?.description}</Typography>
                </Accordion>
              ))}
            </Card>
            <div className=" mt-5">
              <Typography variant="h3" className="font-semibold text-primary">
                Hotel Bio
              </Typography>
              <Typography variant="p" className="!text-sm text-secondary mt-2">
                {event?.description}
              </Typography>
              <Typography variant="p" className="mt-5">
                Welcome to [Hotel Name], where comfort and elegance await you in
                the heart of [City Name]. Our hotel provides a luxurious escape
                for travelers with spacious rooms, modern amenities, and
                exceptional service tailored to make your stay unforgettable.
              </Typography>

              <Typography variant="p" className="mt-5">
                Indulge in a world of flavors at our dining venues, where
                gourmet dishes and locally inspired cuisine come together to
                offer a unique culinary experience. Enjoy your meal with a view
                at our rooftop restaurant, or relax with a cocktail by the pool.
              </Typography>

              <Typography variant="p" className="mt-5">
                Relax and rejuvenate at our wellness center, featuring a spa,
                fitness area, and refreshing pool. Whether you’re unwinding
                after a long day or energizing yourself for new adventures, our
                facilities are designed to enhance your well-being.
              </Typography>

              <Typography variant="p" className="mt-5">
                From personalized services to elegant spaces, [Hotel Name] is
                dedicated to making your stay exceptional. Join us to experience
                the perfect blend of luxury and hospitality, right in the heart
                of [City Name].
              </Typography>
            </div>
          </div>
        </div>

        <div className="sticky top-5 w-[400px] ">
          <HostBio />
        </div>
      </div>
      <HotelBio />
    </div>
  );
};
