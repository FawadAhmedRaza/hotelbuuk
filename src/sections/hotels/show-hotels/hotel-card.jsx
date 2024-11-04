"use client";
import React, { useEffect, useState } from "react";
import { AnchorTag, Card, Iconify, Typography } from "@/src/components";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/src/redux/all-events/thunk";
import ImageRender from "@/src/components/ImageRenderer";
import { paths } from "@/src/contants";
import { cn } from "@/lib/utils";
import EventCardSkeleton from "@/src/components/Skeleton/event-card-skeleton";
import { useTranslation } from "react-i18next";

const HotelCard = ({ filteredEvents }) => {
  const [hotelEvents, sethotelEvents] = useState([]);
  const { isLoading } = useSelector((state) => state.allEvents);

  useEffect(() => {
    const filteredHotelEvents = filteredEvents?.filter(
      (event) => event?.accomodation_type === "bnb"
    );

    sethotelEvents(filteredHotelEvents);
  }, [filteredEvents]);

  const { t } = useTranslation();

  return (
    <>
      <div>
        <Typography variant="p" className="font-medium">
          {t("common.showing")}{" "}
          {hotelEvents?.length > 4 ? 4 : hotelEvents?.length} {t("common.of")}{" "}
          <span className="text-blue-500">
            {hotelEvents?.length}+ {t("common.place")}
          </span>
        </Typography>
      </div>
      <div className=" mt-5 space-y-5">
        {isLoading
          ? [1, 2, 3, 4].map(() => <EventCardSkeleton />)
          : hotelEvents?.map((event) => (
              <Card
                key={event?.id}
                className="p-0 overflow-hidden rounded-xl shadow-md border cursor-pointer"
              >
                <AnchorTag
                  href={paths.hotels.getHotelById(event?.id, event?.type)}
                  className={"relative w-full !text-black hover:!no-underline"}
                >
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-1/3">
                      <ImageRender
                        src={
                          event?.event_images?.[0]?.img ||
                          event?.hotel?.hotel_image
                        }
                        type={"server"}
                        alt={`Uploaded Image `}
                        className="w-full h-48 md:h-48 md:w-full object-cover"
                      />
                    </div>
                    <div className="px-5 py-4 w-full md:w-2/3">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-10">
                        <Typography
                          variant="h4"
                          className="font-semibold text-lg md:text-xl"
                        >
                          {event?.title}
                        </Typography>
                        <Typography
                          variant="h4"
                          className="font-semibold text-gray-500 text-xl"
                        >
                          ${event?.price}
                        </Typography>
                      </div>
                      <div className="flex gap-1 items-center my-2">
                        <Iconify
                          iconName="ion:location-sharp"
                          className="text-gray-600"
                        />
                        <Typography
                          variant="p"
                          className="text-gray-600 text-sm md:text-base"
                        >
                          {event?.hotel?.country} - View on map
                        </Typography>
                      </div>
                      <Typography variant="p" className="flex items-center">
                        <span className="text-red-500 font-bold mr-1">★</span>
                        <span className="text-gray-500 ml-2">
                          {event?.hotel?.stars}-star hotel
                        </span>
                        <span className="text-gray-500 ml-5 font-semibold">
                          {event?.event_associated_amenities?.length} Amenities
                        </span>
                      </Typography>
                      <div className="flex gap-2 items-center mt-2">
                        <div className="border rounded-md text-xs border-black p-1 flex justify-center items-center">
                          {event?.hotel?.stars}
                        </div>
                        <Typography variant="p" className="font-semibold">
                          Excellent
                        </Typography>
                        <Typography variant="p">
                          <span>{200}</span> reviews
                        </Typography>
                      </div>
                    </div>
                  </div>
                </AnchorTag>
              </Card>
            ))}
      </div>
    </>
  );
};

export default HotelCard;
