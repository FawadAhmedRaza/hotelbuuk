"use client";
import * as Yup from "yup";
import { Breadcrumb, Button, Pannel } from "@/src/components";
import Tabs from "@/src/components/tabs";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";
import { RoomInfo } from "@/src/sections/hotel-dashboard-sections/room";
import ImageUploader from "@/src/sections/nomad/stepper-view/image-uploader";
import {
  getAllRoomTypes,
  getRoomById,
  updateRoom,
} from "@/src/redux/hotel-rooms/thunk";
import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { paths } from "@/src/contants";

const EditRoomScreen = ({ isEdit }) => {
  const router = useRouter();
  const param = useParams();
  const [activeTab, setActiveTab] = useState("room-info");
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [hotelId, setHotelId] = useState("");

  const { room, isLoading } = useSelector((state) => state.rooms.getById);

  const RoomSchema = Yup.object().shape({
    room_info: Yup.object().shape({
      room_name: Yup.string().required("Room name is required"),
      description: Yup.string().required("Description is required"),
      maximum_occupancy: Yup.string().required("Maximum occupancy is required"),
      room_type: Yup.string().required("Room type is required"),
      price: Yup.string().required("Pricing is required"),
      room_facilities: Yup.lazy((value) =>
        Yup.object().shape(
          Object.keys(value || {}).reduce((schema, key) => {
            schema[key] = Yup.boolean().required(`${key} is required`);
            return schema;
          }, {})
        )
      ),
    }),
    images: Yup.array(),
    // .min(10, "At least ten images is required"),
  });

  const methods = useForm({
    resolver: yupResolver(RoomSchema),
    defaultValues: {}, // Initially empty
  });

  const { handleSubmit, formState, reset } = methods;
  const { errors, isSubmitting } = formState;

  const fetchRoom = async () => {
    try {
      const fetchedRoom = await dispatch(getRoomById(param.id)).unwrap();
      console.log("Fetched Room Data:", fetchedRoom);

      const facilities = {
        air_conditioning: fetchedRoom.air_conditioning || false,
        heating: fetchedRoom.heating || false,
        private_balcony: fetchedRoom.private_balcony || false,
        mini_fridge: fetchedRoom.mini_fridge || false,
        flat_screen_tv: fetchedRoom.flat_screen_tv || false,
        room_service: fetchedRoom.room_service || false,
        coffee_machine: fetchedRoom.coffee_machine || false,
        king_bed: fetchedRoom.king_bed || false,
        desk_workspace: fetchedRoom.desk_workspace || false,
        private_bathroom: fetchedRoom.private_bathroom || false,
        smart_lighting: fetchedRoom.smart_lighting || false,
        soundproof_windows: fetchedRoom.soundproof_windows || false,
        wardrobe: fetchedRoom.wardrobe || false,
        blackout_curtains: fetchedRoom.blackout_curtains || false,
        luxury_toiletries: fetchedRoom.luxury_toiletries || false,
        high_thread_sheets: fetchedRoom.high_thread_sheets || false,
      };

      reset({
        room_info: {
          room_name: fetchedRoom.room_name || "",
          description: fetchedRoom.description || "",
          maximum_occupancy: fetchedRoom.maximum_occupancy || "",
          room_type: fetchedRoom.room_type || "",
          price: fetchedRoom.price || "",
          room_facilities: facilities, // Set facilities here
        },
        images: fetchedRoom.images || [],
      });
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  };

  const fetchRoomTypes = async () => {
    try {
      await dispatch(getAllRoomTypes(user?.id)).unwrap();
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  const fetchHotelId = async () => {
    try {
      const request = await getHotelId(user?.id);
      console.log("Hotel ID:", request?.id);
      setHotelId(request?.id);
    } catch (error) {
      console.error("Error fetching hotel ID:", error);
    }
  };

  useEffect(() => {
    fetchRoom();
    fetchRoomTypes();
    fetchHotelId();
  }, []); // Runs only once on component mount

  const onSubmit = handleSubmit(async (data) => {
    console.log(room.hotel_id);
    data.hotel_id = hotelId;
    console.log("Form Submitted Data:", data);

    // Correct extraction of facilities from nested path
    const facilities = data.room_info.room_facilities;

    const room_info = {
      room_name: data.room_info.room_name,
      room_type: data.room_info.room_type,
      price: data.room_info.price,
      maximum_occupancy: data.room_info.maximum_occupancy,
      description: data.room_info.description,
      room_facilities: facilities,
    };

    try {
      await dispatch(
        updateRoom({
          id: param.id,
          data: { hotel_id: room.hotel_id, room_info },
        })
      ).unwrap();
      enqueueSnackbar("Room Update successfully!", { variant: "success" });

      router.push(paths.hotelDashboard.rooms);
    } catch (error) {
      console.error("Error Updating room:", error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  });

  const TABS = [
    {
      label: "Room Info",
      icon: "solar:home-outline",
      value: "room-info",
      component: <RoomInfo />,
    },
    {
      label: "Upload Images",
      icon: "ph:images",
      value: "images",
      component: <ImageUploader />,
    },
  ];

  return (
    <Pannel>
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <div className="w-full">
          <Tabs TABS={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex justify-end my-5">
          <Button type="submit">Update Room</Button>
        </div>
      </RHFFormProvider>
    </Pannel>
  );
};

export default EditRoomScreen;
