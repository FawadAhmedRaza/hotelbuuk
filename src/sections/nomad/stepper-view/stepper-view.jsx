"use client";
import React, { useState } from "react";

// Components and Others...
import { Pannel, Stepper } from "@/src/components";
import { BussinessMeeting } from "./bussiness-meeting";
import { RHFFormProvider } from "@/src/components/hook-form";
import { useForm } from "react-hook-form";
import { GuestLearn } from "./guest";
import { SetAvailability } from "./availabilty";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const StepperView = () => {
  const [activeStep, setActiveStep] = useState(0);

  const NomadSchema = Yup.object().shape({
    business_meeting: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      official_name: Yup.string().required("Official name is required"),
      business_category: Yup.string().required("Business category is required"),
      accomodation_type: Yup.string().required("Accommodation type is required"),
      location: Yup.object().shape({
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        street: Yup.string().required("Street is required"),
      }),
    }),
  
    learning_info: Yup.object().shape({
      title: Yup.string().required("Learning title is required"),
      description: Yup.string().required("Learning description is required"),
    }),
  
    availibility: Yup.object().shape({
      start_date: Yup.date()
        .required("Start date is required")
        .typeError("Invalid date format"),
      end_date: Yup.date()
        .required("End date is required")
        .min(
          Yup.ref('start_date'),
          "End date must be after the start date"
        )
        .typeError("Invalid date format"),
    }),
  });
  

  const methods = useForm({
    resolver: yupResolver(NomadSchema),
    defaultValues: {
      business_meeting: {
        title: "",
        description: "",
        official_name: "",
        business_category: "",
        accomodation_type: "",
        location: {
          country: "",
          city: "",
          street: "",
        },
      },
      learning_info: {
        title: "",
        description: "",
      },
      availibility: {
        start_date: "",
        end_date: "",
      },
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  console.log(errors);

  const handleSubmit = async (data) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const steps = [
    {
      label: "Bussiness Meeting Info",
      icon: "mdi:business-outline",
      value: "bussiness",
      component: <BussinessMeeting />,
    },
    {
      label: "What Guest will Learn",
      icon: "octicon:person-16",
      value: "guest",
      component: <GuestLearn />,
    },
    {
      label: "Set Availability",
      icon: "heroicons:hand-thumb-up",
      value: "availability",
      component: <SetAvailability />,
    },
  ];

  return (
    <Pannel>
      <RHFFormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <Stepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </RHFFormProvider>
    </Pannel>
  );
};
