"use client";
import {
  Button,
  Card,
  Iconify,
  ProfileAvatar,
  Typography,
} from "@/src/components";
import React, { useEffect, useState } from "react";
import { RecentBookingListView } from "./recent-booking-list-view";
import Image from "next/image";
import { recommended_nomad } from "@/src/_mock/_recommended_nomad";
import { useDispatch, useSelector } from "react-redux";
import { getHotelInfo } from "@/src/redux/hotel-info/thunk";

recommended_nomad;
const RecentBooking = () => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const { hotels, isLoading } = useSelector((state) => state.hotelInfo);
  console.log("Hotel List", hotels);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const fetchHotels = async () => {
    try {
      await dispatch(getHotelInfo()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className=" my-10">
      <div className="lg:grid grid-cols-12 gap-4  ">
        <div className="grid-cols-12 md:col-span-8">
          <Typography variant="h4">Recent Booking</Typography>
          <RecentBookingListView />
        </div>

        <div className="grid-cols-12 md:col-span-4 ">
          <Typography variant="h4">Recommended Hotels</Typography>
          <Card className=" p-2.5 md:p-5 flex flex-col gap-5 mt-5">
            {/* Container with fixed height and scrollable content */}
            <div
              className={`space-y-4 custom-scrollbar ${
                showMore ? "overflow-y-auto" : ""
              } h-[27rem]  sm:h-[10rem] md:h-[25rem] overflow-hidden`}
            >
              {hotels
                .slice(0, showMore ? recommended_nomad.length : 4)
                .map((hotel) => (
                  <div key={hotel.id} className="w-full">
                    <Card className="!shadow-custom-shadow-xs !p-1.5 md:!p-3 border-l-4 border-primary !rounded-md w-full">
                      <div className="flex gap-4 w-full">
                        {!hotel?.hotel_image ? (
                          <Iconify
                            iconName="carbon:user-avatar-filled"
                            className="!size-16 border-primary border-2  rounded-full  text-gray-500"
                          />
                        ) : (
                          <ProfileAvatar
                            src={hotel?.hotel_image}
                            type={"server"}
                            alt={hotel?.hotel_name}
                            className="border-primary border-2 h-16 w-16 rounded-full object-cover"
                          />
                        )}
                        <div className="flex flex-1 flex-col grow">
                          <div className=" flex grow mr-3  justify-between items-center w-full ">
                            <Typography variant="p" className="font-semibold">
                              {hotel.hotel_name}
                            </Typography>
                            <Button
                              className={
                                "rounded-md  px-3 text-[10px]  mb-1  py-[6px]"
                              }
                            >
                              Create List
                            </Button>
                          </div>
                          <Typography variant="p" className="!text-xs">
                            {hotel.description}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>

            <div className="mt-1">
              <Button className="text-sm" onClick={toggleShowMore}>
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecentBooking;
