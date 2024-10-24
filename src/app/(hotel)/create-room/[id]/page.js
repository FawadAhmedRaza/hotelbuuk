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
      room_facilities: {
        air_conditioning: room?.air_conditioning,
        blackout_curtains: room?.blackout_curtains,
        coffee_machine: room?.coffee_machine,
        desk_workspace: room?.desk_workspace,
        flat_screen_tv: room?.flat_screen_tv,
        heating: room?.heating,
        high_thread_sheets: room?.high_thread_sheets,
        luxury_toiletries: room?.luxury_toiletries,
        king_bed: room?.king_bed,
        mini_fridge: room?.mini_fridge,
        private_balcony: room?.private_balcony,
        private_bathroom: room?.private_bathroom,
        room_service: room?.room_service,
        smart_lighting: room?.smart_lighting,
        soundproof_windows: room?.soundproof_windows,
        wardrobe: room?.wardrobe,
      },
    },
    room_images: room?.room_images,
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <EditRoomScreen isEdit={true} defaultValues={defaultValues} />
  );
};

export default page;
