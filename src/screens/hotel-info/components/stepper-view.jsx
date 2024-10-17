"use client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";

// Components and Others...
import { Pannel, Stepper } from "@/src/components";
import HotelInfoForm from "./hote-info-form";

export const StepperView = () => {
  const schema = yup.object({
    hotel_image: yup.mixed().optional(),
    hotel_name: yup.string().required("hotel name is required"),
    description: yup.string().required("description name is required"),
    contact_email: yup.string().required("contact email is required"),
    hotel_contact_no: yup.number().required("contact number is required"),
    address: yup.string().required("address is required"),
    country: yup.string().required("country is required"),
    city: yup.string().required("city is required"),
    stars: yup.mixed().optional().default(4),
    facilites: yup.object().optional(),
  });

  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({ resolver: yupResolver(schema) });

  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = methods;
  console.log("errors", errors);

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
      component: null,
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
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Pannel>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleNext={handleNext}
          handleBack={handleBack}
          isLastStep={activeStep === steps.length - 1}
        />
      </Pannel>
    </RHFFormProvider>
  );
};
