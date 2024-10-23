"use client";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { getAllHotelFacilities } from "@/src/redux/hotel-facilities/thunk";
import { createHotelInfo } from "@/src/redux/hotel-info/thunk";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";

import { Pannel, Stepper } from "@/src/components";
import HotelInfoForm from "./hote-info-form";
import ImageUploader from "@/src/sections/nomad/stepper-view/image-uploader";
import { enqueueSnackbar } from "notistack";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useRouter } from "next/navigation";
import HotelInfoSkeleton from "@/src/components/Skeleton/hotel-info-skeleton";

export const StepperView = ({ defaultValues, isEdit }) => {
  const HotelSchema = Yup.object({
    hotel_image: Yup.mixed().optional(),
    hotel_name: Yup.string().required("hotel name is required"),
    description: Yup.string().optional(),
    contact_email: Yup.string().required("contact email is required"),
    hotel_contact_no: Yup.number().required("contact number is required"),
    address: Yup.string().required("address is required"),
    country: Yup.string().required("country is required"),
    city: Yup.string().required("city is required"),
    stars: Yup.mixed().optional().default(4),
    facilites: Yup.array().optional(),
    images: Yup.array(),
  });

  const [activeStep, setActiveStep] = useState(0);

  const { user, setUser } = useAuthContext();

  const router = useRouter();

  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(HotelSchema),
    defaultValues: isEdit && defaultValues,
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const fetchHotelFacilities = async () => {
    try {
      await dispatch(getAllHotelFacilities(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHotelFacilities();
    }
  }, [user?.id]);

  const steps = [
    {
      label: "Hotel Information",
      icon: "ri:information-line",
      value: "hotelInfo",
      component: <HotelInfoForm />,
    },
    {
      label: "Images",
      icon: "material-symbols:perm-media-outline",
      value: "media",
      component: <ImageUploader />,
    },
  ];

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (activeStep === 0) {
      fieldsToValidate = [
        "hotel_name",
        "description",
        "contact_email",
        "hotel_contact_no",
        "address",
        "country",
        "city",
      ];
    }
    if (activeStep === 1) {
      fieldsToValidate = ["images"];
    }
    const isStepValid = await trigger(fieldsToValidate); // trigger validation
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const finalData = {
        ...data,
        user_id: user?.id,
      };

      const formData = new FormData();

      for (const key in finalData) {
        if (finalData[key] !== null && finalData[key] !== undefined) {
          if (
            typeof finalData[key] === "object" &&
            !(finalData[key] instanceof File)
          ) {
            formData.append(key, JSON.stringify(finalData[key]));
          } else {
            formData.append(key, finalData[key]);
          }
        }
      }

      const response = await axiosInstance.post(
        endpoints.hotel.create,
        formData
      );
      if (response?.status === 201) {
        // let { accessToken, user } = response?.data || {};
        // await setUser(user, accessToken);
        enqueueSnackbar("Hotel info created", { variant: "success" });
        // router.push("/hotel-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Pannel>
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleNext={handleNext}
          handleBack={handleBack}
          isLastStep={activeStep === steps.length - 1}
          loading={isSubmitting}
        />
        {/* <HotelInfoSkeleton /> */}
      </RHFFormProvider>
    </Pannel>
  );
};
