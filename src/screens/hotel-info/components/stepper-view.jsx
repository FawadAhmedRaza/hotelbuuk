"use client";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";

// Components and Others...
import { Pannel, Stepper } from "@/src/components";
import HotelInfoForm from "./hote-info-form";
import ImageUploader from "@/src/sections/nomad/stepper-view/image-uploader";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch } from "react-redux";
import { getAllHotelFacilities } from "@/src/redux/hotel-facilities/thunk";

export const StepperView = () => {
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
    facilites: Yup.object().optional(),
    images: Yup.array(),
  });

  const [activeStep, setActiveStep] = useState(0);

  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const methods = useForm({ resolver: yupResolver(HotelSchema) });

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = methods;
  console.log("errors", errors);

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
        // "hotel_name",
        // "description",
        // "contact_email",
        // "hotel_contact_no",
        // "address",
        // "country",
        // "city",
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
      console.log("data", data);
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
        />
      </RHFFormProvider>
    </Pannel>
  );
};
