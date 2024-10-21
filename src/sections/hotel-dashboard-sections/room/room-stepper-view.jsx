"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";
import { Pannel, Stepper, Typography } from "@/src/components";
import { RoomInfo } from "./room-info";
import ImageUploader from "../../nomad/stepper-view/image-uploader";

export const RoomStepperView = () => {
  const [currentSteps, setCurrentSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const checkBoxSchema = (amenities) => {
    return Yup.object().shape(
      amenities.reduce((schema, amenity) => {
        schema[amenity] = Yup.boolean().required(`${amenity} is required`);

        return schema;
      }, {})
    );
  };

  const RoomSchema = Yup.object().shape({
    room_info: Yup.object().shape({
      room_name: Yup.string().required("Room name is required"),
      description: Yup.string().required("Description is required"),
      maximum_occupancy: Yup.string().required("Maximum occupancy is required"),
      room_type: Yup.string().required("Room type is required"),
      price: Yup.string().required("Pricing is required"),
      room_facilities: Yup.lazy((value) =>
        checkBoxSchema(Object.keys(value || {}))
      ),
    }),
    images: Yup.array(),
    // .min(10, "At least ten images are required")
    // .required("Files are required"),
  });

  const methods = useForm({
    resolver: yupResolver(RoomSchema),
  });

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log("errors", errors);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form submitted: ", data);
  });

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
      component: <ImageUploader />,
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

  return (
    <Pannel>
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <Stepper
          steps={currentSteps}
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
