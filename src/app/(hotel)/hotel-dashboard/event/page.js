"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { getAllHotelEvents } from "@/src/redux/hotel-event/thunk";

import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import HotelEventsView from "@/src/sections/hotel-event/hotel-events-list-view";

const page = () => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const { isLoading } = useSelector((state) => state.hotelEvent);

  const fetchHotelEvents = async () => {
    try {
      await dispatch(getAllHotelEvents(user?.id)).unwrap();
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchHotelEvents();
  }, []);

  return isLoading ? <RoomListSkeleton /> : <HotelEventsView />;
};

export default page;
