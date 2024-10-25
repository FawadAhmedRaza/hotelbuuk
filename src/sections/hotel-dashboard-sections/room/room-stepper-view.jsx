"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RHFFormProvider,
  RHFMultipleImageUploader,
} from "@/src/components/hook-form";
import { Breadcrumb, Pannel, Stepper, Typography } from "@/src/components";
import { RoomInfo } from "./room-info";
import ImageUploader from "../../nomad/stepper-view/image-uploader";
import { useDispatch } from "react-redux";
import { createRoom, getAllRoomTypes } from "@/src/redux/hotel-rooms/thunk";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { getHotelId } from "@/src/actions/auth.actions";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { paths } from "@/src/contants";
import { getAllRoomFacilities } from "@/src/redux/room-facilities/thunk";

export const RoomStepperView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const [currentSteps, setCurrentSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const RoomSchema = Yup.object().shape({
    room_info: Yup.object().shape({
      room_name: Yup.string().required("Room name is required"),
      description: Yup.string().required("Description is required"),
      maximum_occupancy: Yup.string().required("Maximum occupancy is required"),
      room_type: Yup.string().required("Room type is required"),
      price: Yup.string().required("Pricing is required"),
      room_facilities: Yup.array().optional(),
    }),
    room_images: Yup.array(),
    // .min(10, "At least ten images are required")
    // .required("Files are required"),
  });

  const methods = useForm({
    resolver: yupResolver(RoomSchema),
  });

  const {
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const fetchRoomTypes = async () => {
    try {
      await dispatch(getAllRoomTypes(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
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

  const steps = [
    {
      label: "Room Info",
      icon: "solar:home-outline",
      value: "bussiness",
      component: <RoomInfo />,
    },
    {
      label: "Upload Images",
      icon: "ph:images",
      value: "images",
      component: <RHFMultipleImageUploader name="room_images" />,
    },
  ];

  useEffect(() => {
    setCurrentSteps(steps);
  }, []);

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (activeStep === 0) {
      fieldsToValidate = [
        "room_info.room_name",
        "room_info.description",
        "room_info.maximum_occupancy",
        "room_info.room_type",
        "room_info.price",
      ];
    } else if (activeStep === 1) {
      fieldsToValidate = ["images"];
    }
    const isStepValid = await methods.trigger(fieldsToValidate);
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

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
    const roomImages = data.room_images?.map((item) => item?.file);
    const roomImagesNames = data.room_images?.map((item) => item?.name);

    roomImages?.forEach((file) => formData.append("room_images", file));
    roomImagesNames?.forEach(() =>
      formData.append("room_images_names", JSON.stringify(roomImagesNames))
    );

    try {
      await dispatch(createRoom(formData)).unwrap(); 
      enqueueSnackbar("Room created", { variant: "success" });
      router.push(paths.hotelDashboard.rooms);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  });

  return (
    <Pannel className="!py-8">
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <Breadcrumb title="Add a New Room" />
        <Stepper
          steps={currentSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleNext={handleNext}
          handleBack={handleBack}
          isLastStep={activeStep === steps.length - 1}
          loading={isSubmitting}
        />
      </RHFFormProvider>
    </Pannel>
  );
};
