"use client";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getRoomById } from "@/src/redux/hotel-rooms/thunk";
import { useParams } from "next/navigation";

import EditRoomScreen from "@/src/screens/hotel-dashboard/edit-room-screen";
import Spinner from "@/src/components/ui/spinner";

const page = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading, room } = useSelector((state) => state.rooms.getById);

  const fetchRoomById = async () => {
    try {
      await dispatch(getRoomById(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomById();
  }, []);

  let defaultValues = {
    room_info: {
      room_name: room?.room_name,
      description: room?.description,
      maximum_occupancy: room?.maximum_occupancy,
      room_type: room?.room_type,
      price: room?.price,
    },
    room_facilities: room?.room_facilities,
    room_images: room?.room_images,
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <EditRoomScreen isEdit={true} defaultValues={defaultValues} />
  );
};

export default page;
