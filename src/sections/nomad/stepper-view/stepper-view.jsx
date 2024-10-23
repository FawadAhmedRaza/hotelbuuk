"use client";
import React, { useEffect, useState } from "react";
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
import ImageUploader from "./image-uploader";

const checkBoxSchema = (amenities) => {
  return Yup.object().shape(
    amenities.reduce((schema, amenity) => {
      schema[amenity] = Yup.boolean().required(`${amenity} is required`);

      return schema;
    }, {})
  );
};

export const StepperView = () => {
  const [currentSteps, setCurrentSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  // Nomad Form Schema
  const NomadSchema = Yup.object().shape({
    business_meeting: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("required"),
      official_name: Yup.string().required("Official name is required"),
      business_category: Yup.string().required("Business category is required"),
      accomodation_type: Yup.string().default("bnb"),
      hotel: Yup.string().when("accomodation_type", {
        is: "hotel",
        then: (schema) => schema.required("hotel is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      location: Yup.object().shape({
        country: Yup.string().when("$accomodation_type", {
          is: "bnb",
          then: (schema) => schema.required("country is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
        city: Yup.string().when("$accomodation_type", {
          is: "bnb",
          then: (schema) => schema.required("city is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
        street_name: Yup.string().when("$accomodation_type", {
          is: "bnb",
          then: (schema) => schema.required("street is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      }),
      amenities: Yup.lazy((value) => checkBoxSchema(Object.keys(value || {}))),
    }),
    images: Yup.array()
      .when("accomodation_type", {
        is: "hotel",
        then: (schema) => schema.required("hotel is required"),
        otherwise: (schema) => schema.notRequired(),
      })
      .min(10, "At least ten images are required")
      .required("Files are required"),

    topics: Yup.array()
      .min(1, "At least one topic is required")
      .required("Files are required"),
    availibility: Yup.object().shape({
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
      rules: Yup.lazy((value) => checkBoxSchema(Object.keys(value || {}))),
    }),
    price: Yup.string().required("Price is required"),
  });

  const methods = useForm({
    resolver: yupResolver(NomadSchema),
    defaultValues: {
      business_meeting: {
        title: "",
        description: "",
        official_name: "",
        business_category: "",
        accomodation_type: "bnb",
        hotel: "",
        location: {
          country: "",
          city: "",
          street_name: "",
        },
        amenities: {},
      },
      images: [],
      topics: [],
      availibility: {
        start_date: "",
        end_date: "",
        rules: {},
      },
    },
    context: {
      accomodation_type: "bnb",
    },
  });

  const { trigger, watch, handleSubmit } = methods;

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
      label: "Upload Images",
      icon: "ph:images",
      value: "images",
      component: <ImageUploader />,
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

  const accomodationType = watch("business_meeting.accomodation_type");

  useEffect(() => {
    if (accomodationType === "bnb") {
      setCurrentSteps(steps);
    } else {
      const newSteps = steps.filter((step) => step.value !== "images");
      setCurrentSteps(newSteps);
    }
  }, [accomodationType]);

  const handleNext = async () => {
    const fieldsToValidate = [];

    if (activeStep === 0) {
      fieldsToValidate.push(
        "business_meeting.title",
        "business_meeting.description",
        "business_meeting.official_name",
        "business_meeting.business_category",
        "business_meeting.accomodation_type", // Ensure it’s present
        "business_meeting.amenities"
      );

      if (accomodationType === "hotel") {
        fieldsToValidate.push("business_meeting.hotel"); // Validate hotels field only if type is hotel
      } else if (accomodationType === "bnb") {
        fieldsToValidate.push(
          "business_meeting.location.country",
          "business_meeting.location.city",
          "business_meeting.location.street_name"
        );
      }
    } else if (activeStep === 1) {
      // Allow skipping the image validation if hotel type
      if (accomodationType === "bnb") {
        fieldsToValidate.push("images");
      }
    } else if (activeStep === 2) {
      fieldsToValidate.push("topics");
    } else if (activeStep === 3) {
      fieldsToValidate.push("availibility.start_date", "availibility.end_date");
    }

    const isStepValid = await trigger(fieldsToValidate); // Validate step-specific fields

    if (isStepValid) {
      setActiveStep((prev) => prev + 1); // Move to next step if valid
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
          isLastStep={activeStep === currentSteps.length - 1}
        />
      </RHFFormProvider>
    </Pannel>
  );
};
