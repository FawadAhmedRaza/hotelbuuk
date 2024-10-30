"use client";
import React, { useEffect, useState } from "react";
import { AnchorTag, Card, Iconify, Typography } from "@/src/components";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/src/redux/all-events/thunk";
import ImageRender from "@/src/components/ImageRenderer";
import { paths } from "@/src/contants";
import { cn } from "@/lib/utils";
import EventCardSkeleton from "@/src/components/Skeleton/event-card-skeleton";

const mockHotels = [
  {
    id: 1,
    name: "Luxury Stay at The Heart of the City Luxury Stay at The Heart of the City",
    price: 350,
    location: "Times Square, New York",
    rating: 4.9,
    amenities: 30000,
    image: "/assets/images/hotel-det-1.png",
    reviews: 210,
  },
  {
    id: 2,
    name: "Beachfront Bliss with Stunning Views Beachfront Bliss with Stunning Views",
    price: 275,
    location: "Waikiki, Honolulu",
    rating: 4.7,
    amenities: 18000,
    image: "/assets/images/hotel-det-2.png",
    reviews: 340,
  },
  {
    id: 3,
    name: " Modern Comfort in a Classic Setting Modern Comfort in a Classic Setting",
    price: 225,
    location: "Downtown, Chicago",
    rating: 4.6,
    amenities: 20000,
    image: "/assets/images/hotel-det-3.png",
    reviews: 190,
  },
  {
    id: 4,
    name: " Eco-Friendly Resort in the Mountains Eco-Friendly Resort in the Mountains",
    price: 300,
    location: "Aspen, Colorado",
    rating: 4.8,
    amenities: 22000,
    image: "/assets/images/hotel-det-4.png",
    reviews: 145,
  },
];

const HotelCard = () => {
  const [hotelEvents, sethotelEvents] = useState([]);

  const dispatch = useDispatch();

  const { events, isLoading } = useSelector((state) => state.allEvents);

  useEffect(() => {
    async function fetchEvents() {
      await dispatch(getAllEvents()).unwrap();
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    const filteredEvents = events?.filter(
      (event) => event?.accomodation_type === "bnb"
    );

    sethotelEvents(filteredEvents);
  }, []);

  console.log("Events from Show mote", hotelEvents);

  return (
    <>
      <div>
        <Typography variant="p" className="font-medium">
          Showing {hotelEvents?.length > 4 ? 4 : hotelEvents?.length} of{" "}
          <span className="text-blue-500">{hotelEvents?.length}+ places</span>
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
