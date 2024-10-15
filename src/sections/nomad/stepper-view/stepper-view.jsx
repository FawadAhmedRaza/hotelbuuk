"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";

// Components and Others...
import { Pannel, Stepper } from "@/src/components";
import { BussinessMeeting } from "./bussiness-meeting";
import { GuestLearn } from "./guest";
import { SetAvailability } from "./availabilty";
import { Pricing } from "./pricing";

export const StepperView = () => {
  const [activeStep, setActiveStep] = useState(0);

  const NomadSchema = Yup.object().shape({
    business_meeting: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("required"),
      official_name: Yup.string().required("Official name is required"),
      business_category: Yup.string().required("Business category is required"),
      accomodation_type: Yup.string().optional().default("bnb"),
      location: Yup.object().shape({
        country: Yup.string().optional("Country is required"),
        city: Yup.string().optional("City is required"),
        street_name: Yup.string().optional("Street is required"),
      }),
    }),

    learning_info: Yup.object().shape({
      title: Yup.string().required("Learning title is required"),
      description: Yup.string().required("Learning description is required"),
    }),

    availibility: Yup.object().shape({
      start_date: Yup.date()
        .optional("Start date is required"),
        // .typeError("Invalid date format")
      end_date: Yup.date()
        .optional("End date is required")
        // .min(Yup.ref("start_date"), "End date must be after the start date")
        // .min(Yup.ref("start_date"), "End date must be after the start date")
        // .typeError("Invalid date format"),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(NomadSchema),
    defaultValues: NomadSchema.default(),
  });

  const {
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log("errors", errors);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form submitted: ", data);
  });

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
    {
      label: "Pricing",
      icon: "carbon:pricing-traditional",
      value: "pricing",
      component: <Pricing />,
    },
  ];

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (activeStep === 0) {
      fieldsToValidate = [
        "business_meeting.title",
        "business_meeting.description",
        "business_meeting.official_name",
        "business_meeting.business_category",
        "business_meeting.location.country",
        "business_meeting.location.city",
        "business_meeting.location.street_name",
      ];
    } else if (activeStep === 1) {
      fieldsToValidate = ["learning_info.title", "learning_info.description"];
    } else if (activeStep === 2) {
      fieldsToValidate = ["availibility.start_date", "availibility.end_date"];
    }

    const isStepValid = await trigger(fieldsToValidate); // Validate only step-specific fields
    console.log("Is Step Valid:", isStepValid)
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
