"use client";
import {
  Avatar,
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
import { getNomadsProfile } from "@/src/redux/nomad-profile/thunk";
recommended_nomad;
const RecentBooking = () => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const { nomads, isLoading } = useSelector((state) => state.nomadProfile);


  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const fetchNomads = async () => {
    try {
      await dispatch(getNomadsProfile()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNomads();
  }, []);

  return (
    <div className=" my-10">
      <div className="lg:grid grid-cols-12 gap-4  ">
        <div className="grid-cols-12 md:col-span-8">
          <Typography variant="h4">Recent Booking</Typography>
          <RecentBookingListView />
        </div>

        <div className="grid-cols-12 md:col-span-4 ">
          <Typography variant="h4">Recommended Nomad</Typography>
          <Card className=" p-2.5 md:p-5 flex flex-col gap-5 mt-5">
            {/* Container with fixed height and scrollable content */}
            <div
              className={`space-y-4 custom-scrollbar w-full ${
                showMore ? "overflow-y-auto" : ""
              } h-[27rem]  sm:h-[10rem] md:h-[25rem] overflow-hidden`}
            >
              {nomads
                .slice(0, showMore ? recommended_nomad.length : 4)
                .map((person) => (
                  <div key={person.id} className="w-full">
                    <Card className="!shadow-custom-shadow-xs !p-1.5 md:!p-3 border-l-4 border-primary !rounded-md w-full">
                      <div className="flex gap-4 w-full">
                        {/* <Image
                          src={person.imageSrc}
                          height={80}
                          width={80}
                          className="border-primary border-2 h-16 w-16 rounded-full object-cover"
                          alt={person.name}
                        /> */}

                        {!person?.profile_img ? (
                          <Iconify
                            iconName="carbon:user-avatar-filled"
                            className="!size-16 border-primary border-2 h-16 w-16 rounded-full object-cover text-gray-500"
                          />
                        ) : (
                          <ProfileAvatar
                            src={person?.profile_img}
                            type={"server"}
                            alt={person?.hotel_name}
                            className="border-primary border-2 h-16 w-16 rounded-full object-cover"
                          />
                        )}
                        <div className="flex flex-1 flex-col grow">
                          <div className=" flex grow mr-3  justify-between items-center w-full ">
                            <Typography variant="p" className="font-semibold">
                              {person.first_name} {person.last_name}
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
                            {person.email}
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
