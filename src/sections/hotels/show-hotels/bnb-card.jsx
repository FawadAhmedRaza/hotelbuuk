"use client";
import React, { useEffect, useState } from "react";
import { AnchorTag, Card, Iconify, Typography } from "@/src/components";
import { useSelector } from "react-redux";
import EventCardSkeleton from "@/src/components/Skeleton/event-card-skeleton";
import { paths } from "@/src/contants";
import ImageRender from "@/src/components/ImageRenderer";
import NoEvents from "@/src/components/not-evets";

const BnBCard = ({ filteredEvents }) => {
  const [bnbEvents, setbnbEvents] = useState([]);
  const { isLoading } = useSelector((state) => state.allEvents);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    // Indicate that filtering is happening
    setIsFiltering(true);

    // Apply the filter logic
    const filteredBnbEvents = filteredEvents?.filter(
      (event) => event?.accomodation_type !== "bnb"
    );

    // Update the filtered events and stop the filtering state
    setbnbEvents(filteredBnbEvents);
    setIsFiltering(false);
  }, [filteredEvents]);

  return (
    <div>
      <div>
        <Typography variant="p" className="font-medium">
          Showing {bnbEvents?.length > 4 ? 4 : bnbEvents?.length} of{" "}
          <span className="text-blue-500">{bnbEvents?.length}+ places</span>
        </Typography>
      </div>

      <div className="mt-5 space-y-5">
        {isLoading || isFiltering ? (
          // Show skeleton loaders while loading or filtering
          [1, 2, 3, 4].map((_, index) => <EventCardSkeleton key={index} />)
        ) : bnbEvents && bnbEvents.length > 0 ? (
          // Render BnB events if there are any after filtering
          bnbEvents.map((event) => (
            <Card
              key={event?.id}
              className="p-0 overflow-hidden rounded-xl shadow-md border"
            >
              <AnchorTag
                href={paths.hotels.getHotelById(event?.id, event?.type)}
                className={"relative w-full !text-black hover:!underline-none"}
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
          ))
        ) : (
          // Show the NoEvents component if there are no BnB events after filtering
          <NoEvents message={"No BnB Events Found"} />
        )}
      </div>
    </div>
  );
};

export default BnBCard;
