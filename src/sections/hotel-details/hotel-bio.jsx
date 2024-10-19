import React from "react";
import { Button, Iconify, Pannel, Typography } from "@/src/components";
import Built from "@/src/components/built";

// Mock data for hotel details
const hotelData = {
  time: "10am - 4pm",
  flexible: true,
  image: "/assets/images/hotel-bio.png",
  bio: "Booking A Day Use Room Grants You The Use Of Amenities Of The Property",
  amenities: [
    { id: 1, name: "Indoor pool", icon: "fas fa-swimming-pool" },
    { id: 2, name: "Fitness center", icon: "fas fa-dumbbell" },
    { id: 3, name: "Spa and wellness center", icon: "fas fa-spa" },
    { id: 4, name: "Bar/Lounge", icon: "fas fa-glass-martini-alt" },
    { id: 5, name: "Restaurant", icon: "fas fa-utensils" },
    { id: 6, name: "Free Wi-Fi", icon: "fas fa-wifi" },
    { id: 7, name: "Room service", icon: "fas fa-concierge-bell" },
    { id: 8, name: "Tea/coffee machine", icon: "fas fa-coffee" },
  ],
  pricePerNight: 80,
  tourName: "Business Tour | Manufacturing",
  marketTour: "London Market Tour",
  checkInDate: "10/8/2024",
  checkOutDate: "15/8/2024",
  nights: 5,
  guests: 1,
  priceDetails: [
    { description: "$20 x 4 Nights", amount: 80 },
    { description: "Hotelbuuk Service Fee", amount: 20 },
  ],
  total: 100,
};

export const HotelBio = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-custom-shadow-sm mt-20 ">
      {/* Left Panel - Image and Time */}
      <div className="flex flex-col items-center lg:items-start w-full lg:w-2/3 bg-primary text-white rounded-xl p-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-medium flex items-center gap-2">
            <Iconify iconName="noto-v1:alarm-clock" />
            {hotelData?.time}
          </span>
          {hotelData.flexible && (
            <Button className="bg-white text-primary ">Flexible</Button>
          )}
        </div>
        <img src={hotelData?.image} alt="Hotel Room" className="mt-4 " />
      </div>
      {/* Right Panel - Hotel Details and Booking Information */}
      <div className=" flex flex-col justify-start  items-start w-full   p-4">
        {/* Hotel Bio */}
        <Typography variant="h5" className="font-semibold text-primary ">
          Hotel Bio
        </Typography>
        <Typography variant="p" className="!text-sm text-secondary mt-2">
          {hotelData?.bio}
        </Typography>

        {/* Included Amenities */}
        {/* <div className="mt-4">
          <Typography variant="h4" className="font-semibold text-primary">
            Included Amenities
          </Typography>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {hotelData?.amenities?.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-2">
                <Iconify iconName={amenity?.icon} className="border" />
                <Typography variant="p" className="">
                  {amenity?.name}
                </Typography>
              </div>
            ))}
          </div>
        </div> */}
        <div className="grid grid-cols-2 gap-10 mt-5">
          <div className="">
            <Typography variant="h4" className=" font-semibold text-primary">
              Teaching Tool
            </Typography>
            <div className=" mt-3">
              <Built>Video</Built>
              <Built>Samples</Built>
            </div>
          </div>
          <div className=" ">
            <Typography variant="h4" className=" font-semibold text-primary">
              Competence
            </Typography>
            <div className=" mt-3">
              <Built>Market Research</Built>
              <Built>Negotiation</Built>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Information */}
      <div className="w-full lg:w-2/3  py-4 px-5  flex flex-col justify-between lg:border-l-2 border-neutral-400">
        <div className="flex flex-col gap-1">
          <Typography variant="h6" className=" font-semibold">
            ${hotelData.pricePerNight} Per Night
          </Typography>
          <Typography variant="h6" className="font-semibold text-start ">
            {hotelData.tourName}
          </Typography>
          <Typography variant="h5" className="font-semibold text-center">
            {hotelData.marketTour}
          </Typography>

          {/* Dates and Guests */}
          <div className="grid grid-cols-3 bg-neutral-100 rounded-xl shadow-lg  items-center mt-4 divide-x divide-neutral-400 ">
            <div className="flex flex-col justify-center  items-center sm:items-start  sm:p-5 lg:px-2">
              <Typography
                variant="p"
                className="!text-xs sm:text-sm font-medium"
              >
                Check-In
              </Typography>
              <Typography variant="p" className="!text-xs sm:text-sm">
                {hotelData.checkInDate}
              </Typography>
            </div>
            <div className="flex flex-col justify-center  items-center sm:items-start sm:p-5 lg:px-2">
              <Typography
                variant="p"
                className="!text-xs sm:text-sm font-medium"
              >
                Checkout
              </Typography>
              <Typography variant="p" className="!text-xs sm:text-sm">
                {hotelData.checkOutDate}
              </Typography>
            </div>
            <div className="flex justify-between  p-5 lg:px-2">
              <Typography
                variant="p"
                className="!text-xs sm:text-sm font-medium"
              >
                {hotelData.nights} Night
              </Typography>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full mt-2">
            <div className=" flex gap-2  justify-between border-b w-full pb-2 border-neutral-500 ">
              <Typography
                variant="p"
                className="font-medium grow justify-between"
              >
                Guests
              </Typography>
              <span className="flex   items-center gap-3 cursor-pointer">
                <Typography variant="p" className=" font-medium">
                  1 guest
                </Typography>
                <Iconify
                  iconName="mdi:arrow-down-drop"
                  className="text-black"
                />
              </span>
            </div>
            <Typography variant="p" className="text-secondary text-center">
              price includes business room & meetings
            </Typography>
            <div className=" flex flex-col gap-2 ">
              <div className=" flex flex-col gap-2 border-b w-full pb-2 border-neutral-500">
                {hotelData.priceDetails.map((detail, index) => (
                  <span
                    className="flex justify-between items-center "
                    key={index}
                  >
                    <Typography variant="p" className="font-medium">
                      {detail.description}
                    </Typography>
                    <Typography variant="p" className="font-medium">
                      ${detail.amount}
                    </Typography>
                  </span>
                ))}
              </div>
              <span className="flex justify-between items-center mt-2 mb-3">
                <Typography variant="h6" className="font-semibold">
                  Total
                </Typography>
                <Typography variant="h6" className="font-semibold">
                  ${hotelData.total}
                </Typography>
              </span>
            </div>
          </div>
        </div>
        {/* Reserve Button */}
        <Button className="!w-full">Reserve</Button>
        {/* <span className="flex justify-center items-center gap-3 w-full mt-4 md:mt-2">
          <Iconify iconName="mynaui:flag-solid" className="text-black" />
          <Typography variant="p" className=" font-medium">
            Report This Listing
          </Typography>
        </span> */}
      </div>
    </div>
  );
};
