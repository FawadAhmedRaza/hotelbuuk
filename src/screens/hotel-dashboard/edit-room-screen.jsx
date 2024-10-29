"use client";
import * as Yup from "yup";
import { Breadcrumb, Button, Pannel } from "@/src/components";
import Tabs from "@/src/components/tabs";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RHFFormProvider,
  RHFMultipleImageUploader,
} from "@/src/components/hook-form";
import { RoomInfo } from "@/src/sections/hotel-dashboard-sections/room";
import ImageUploader from "@/src/sections/event/stepper-view/image-uploader";
import {
  getAllRoomTypes,
  getRoomById,
  updateRoom,
} from "@/src/redux/hotel-rooms/thunk";
import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { paths } from "@/src/contants";
import { getAllRoomFacilities } from "@/src/redux/room-facilities/thunk";

const EditRoomScreen = ({ isEdit, defaultValues }) => {
  console.log("default avlues", defaultValues);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("room-info");

  const RoomSchema = Yup.object().shape({
    room_info: Yup.object().shape({
      room_name: Yup.string().required("Room name is required"),
      description: Yup.string().required("Description is required"),
      maximum_occupancy: Yup.string().required("Maximum occupancy is required"),
      room_type: Yup.string().required("Room type is required"),
      price: Yup.string().required("Pricing is required"),
    }),
    room_facilities: Yup.array().optional(),
    room_images: Yup.array().min(2, "At least ten images is required"),

    availibility: Yup.object().shape({
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(RoomSchema),
    defaultValues: isEdit && defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const fetchRoomTypes = async () => {
    try {
      await dispatch(getAllRoomTypes(user?.id)).unwrap();
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  const fetchRoomFacilities = async () => {
    try {
      await dispatch(getAllRoomFacilities(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
    fetchRoomFacilities();
  }, []);

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
      component: <RHFMultipleImageUploader name="room_images" />,
    },
  ];

  const onSubmit = handleSubmit(async (data) => {
    data.hotel_id = user?.hotels?.[0]?.id;
    const formData = new FormData();

    for (const key in data) {
      if (
        data[key] !== null &&
        data[key] !== undefined &&
        key !== "room_images"
      ) {
        if (typeof data[key] === "object" && !(data[key] instanceof File)) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    let imagesWithUrls = [];
    let newUploadedImages = [];
    data?.room_images?.forEach((item) => {
      if (item?.img && !item?.file) {
        imagesWithUrls?.push(item);
      } else if (item?.file) {
        newUploadedImages?.push({ file: item?.file, name: item?.name });
      }
    });

    const newImages = newUploadedImages?.map((item) => item?.file);
    const newImagesNames = newUploadedImages?.map((item) => item?.name);

    formData.append("images_with_urls", JSON.stringify(imagesWithUrls)); // with urls
    newImages?.forEach((file) => formData.append("new_room_images", file)); // new uploaded
    newImagesNames?.forEach(() =>
      // new uploaded names
      formData.append("new_room_images_names", JSON.stringify(newImagesNames))
    );
    try {
      await dispatch(
        updateRoom({
          id: id,
          data: formData,
        })
      ).unwrap();
      enqueueSnackbar("Room Update successfully!", { variant: "success" });
      router.push(paths.hotelDashboard.rooms);
    } catch (error) {
      console.error("Error Updating room:", error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  });

  return (
    <Pannel className="!py-8">
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <Breadcrumb title="Update room" />
        <div className="w-full !mt-4">
          <Tabs TABS={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {activeTab === "images" && (
          <div className="flex justify-end my-5">
            <Button type="submit" loading={isSubmitting}>
              Update Room
            </Button>
          </div>
        )}
      </RHFFormProvider>
    </Pannel>
  );
};

export default EditRoomScreen;
