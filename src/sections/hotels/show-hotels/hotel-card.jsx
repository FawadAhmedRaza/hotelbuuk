"use client";
import React from "react";
import { Card, Iconify, Typography } from "@/src/components";

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
  return (
    <div>
      <div>
        <Typography variant="p" className="font-medium">
          Showing 4 of <span className="text-blue-500">200+ places</span>
        </Typography>
      </div>
      <div className="mt-5 space-y-5">
        {mockHotels.map((item) => (
          <Card
            key={item.id}
            className="p-0 overflow-hidden rounded-xl shadow-md border"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 md:h-48 object-cover"
                />
              </div>
              <div className="px-5 py-4 w-full md:w-2/3">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-10">
                  <Typography
                    variant="h4"
                    className="font-semibold text-lg md:text-xl"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-semibold text-gray-500 text-xl"
                  >
                    ${item.price}
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
                    {item.location} - View on map
                  </Typography>
                </div>
                <Typography variant="p" className="flex items-center">
                  <span className="text-red-500 font-bold mr-1">★</span>
                  <span className="text-gray-500 ml-2">
                    {item.rating}-star hotel
                  </span>
                  <span className="text-gray-500 ml-5 font-semibold">
                    {item.amenities.toLocaleString()} Amenities
                  </span>
                </Typography>
                <div className="flex gap-2 items-center mt-2">
                  <div className="border rounded-md text-xs border-black p-1 flex justify-center items-center">
                    {item.rating}
                  </div>
                  <Typography variant="p" className="font-semibold">
                    Excellent
                  </Typography>
                  <Typography variant="p">
                    <span>{item.reviews}</span> reviews
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelCard;
