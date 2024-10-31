"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { getAllBookings } from "@/src/redux/bookings/thunk";

import { enqueueSnackbar } from "notistack";

import { Breadcrumb, Pannel } from "@/src/components";
import HotelBookingList from "./list/hotel-booking-list";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";

const HotelBookingsListOverview = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.bookings);

  const fetchAllBookings = async () => {
    try {
      await dispatch(getAllBookings({ id: user?.id, type: "HOTEL" })).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <Pannel className="flex flex-col gap-10">
      {isLoading ? (
        <RoomListSkeleton />
      ) : (
        <>
          <Breadcrumb title="Bookings List" />

          <HotelBookingList />
        </>
      )}
    </Pannel>
  );
};

export default HotelBookingsListOverview;
