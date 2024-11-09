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
import { recommended_nomad } from "@/src/_mock/_recommended_nomad";
import { useDispatch, useSelector } from "react-redux";
import { getHotelInfo } from "@/src/redux/hotel-info/thunk";
import { useRouter } from "next/navigation";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import RecommendedNomadSkeleton from "@/src/components/Skeleton/recomended-skeleton";

recommended_nomad;
const RecentBooking = () => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { hotels, isLoading: hotelsLoading } = useSelector(
    (state) => state.hotelInfo
  );
  const { isLoading } = useSelector((state) => state.bookings.recentBookings);

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
    <div className="my-10">
      <div className="lg:grid grid-cols-12 gap-4">
        <div className="grid-cols-12 md:col-span-8">
          {isLoading ? (
            <RoomListSkeleton />
          ) : (
            <>
              <Typography variant="h4">Recent Booking</Typography>
              <RecentBookingListView />
            </>
          )}
        </div>
        {isLoading ? (
          <RecommendedNomadSkeleton />
        ) : (
          <div className="grid-cols-12 md:col-span-4 ">
            <Typography variant="h4">Recommended Hotels</Typography>
            <Card className=" p-2.5 md:p-5 flex flex-col gap-5 mt-5">
              {/* Container with fixed height and scrollable content */}
              <div
                className={`space-y-4 custom-scrollbar w-full ${
                  showMore ? "overflow-y-auto" : ""
                } h-[27rem]  sm:h-[10rem] md:h-[25rem] overflow-hidden`}
              >
                {hotels
                  .slice(0, showMore ? recommended_nomad.length : 4)
                  .map((hotel) => (
                    <div key={hotel.id} className="w-full">
                      <Card className="!shadow-custom-shadow-xs   !p-1.5 md:!p-3 border-l-4 border-slate-900 !rounded-md !w-full">
                        <div className="flex gap-4 w-full">
                          <ProfileAvatar
                            src={hotel?.hotel_image}
                            type={"server"}
                            effect="blur"
                            iconSize="!size-16 !border-slate-900"
                            alt={hotel?.hotel_name}
                            className="border-slate-900 border-2 h-16 w-16 rounded-full object-cover"
                          />
                          {/* )} */}
                          <div className="flex flex-1 flex-col grow">
                            <div className=" flex grow mr-3  justify-between items-center w-full ">
                              <div>
                                <Typography
                                  variant="p"
                                  className="font-semibold"
                                >
                                  {hotel.hotel_name}
                                </Typography>

                                <Typography variant="p" className="!text-xs">
                                  {hotel?.description?.length > 40
                                    ? `${hotel?.description?.slice(0, 40)}...`
                                    : hotel?.description}
                                  {/* {hotel.description} */}
                                </Typography>
                              </div>

                              <div className="flex flex-col gap-2 items-end">
                                <Iconify
                                  iconName="tabler:mail-filled"
                                  onClick={() =>
                                    router.push(`/chat/${hotel.user_id}`)
                                  }
                                  className="!size-5  cursor-pointer rounded-full object-cover text-blue-500"
                                />
                                <Button
                                  className={
                                    "rounded-md  px-3 text-[10px]  mb-1  py-[6px] border-slate-900 bg-slate-900"
                                  }
                                >
                                  Create List
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
              </div>

              <div className="mt-1 border-dashed border-t flex justify-center items-center border-primary w-full pt-[20px]">
                <Button
                  className="text-sm bg-slate-900"
                  onClick={toggleShowMore}
                >
                  {showMore ? "Show Less" : "Show More"}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBooking;
