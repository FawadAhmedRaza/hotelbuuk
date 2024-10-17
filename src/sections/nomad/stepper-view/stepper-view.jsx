"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";

// Components and Others...
import { Pannel, Stepper, Typography } from "@/src/components";
import { BussinessMeeting } from "./bussiness-meeting";
import { GuestLearn } from "./guest";
import { SetAvailability } from "./availabilty";
import { Pricing } from "./pricing";
import ImageUploader from "./image-uploader";

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
      hotels: Yup.string().when("accomodation_type", {
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
    }),
    images: Yup.array()
      .min(1, "At least one file is required")
      .required("Files are required"),

    learning_info: Yup.object().shape({
      title: Yup.string().required("Learning title is required"),
      description: Yup.string().required("Learning description is required"),
    }),
    topics: Yup.array()
      .min(1, "At least one topic is required")
      .required("Files are required"),

    availibility: Yup.object().shape({
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
    }),
    price: Yup.string().required("Price is required"),
  });

  const methods = useForm({
    resolver: yupResolver(NomadSchema),
    // defaultValues: NomadSchema.default(),
    defaultValues: {
      business_meeting: {
        title: "",
        description: "",
        official_name: "",
        business_category: "",
        accomodation_type: "bnb", // Ensure this is available in the form state
        hotels: "",
        location: {
          country: "",
          city: "",
          street_name: "",
        },
      },
      images: [],
      learning_info: {
        title: "",
        description: "",
      },
      topics: [],
      availibility: {
        start_date: "",
        end_date: "",
      },
    },
    context: {
      accomodation_type: "bnb", // Ensure context is passed correctly
    },
  });

  const {
    trigger,
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

  // NEW HANDLE NEXT
  const handleNext = async () => {
    // const accomodationType = methods.watch(
    //   "business_meeting.accomodation_type"
    // ); // Get the current accommodation type
    // let fieldsToValidate = [];

    // if (activeStep === 0) {
    //   fieldsToValidate = [
    //     "business_meeting.title",
    //     "business_meeting.description",
    //     "business_meeting.official_name",
    //     "business_meeting.business_category",
    //     "business_meeting.accomodation_type", // Ensure it’s present
    //   ];

    //   if (accomodationType === "hotel") {
    //     fieldsToValidate.push("business_meeting.hotels"); // Validate hotels field only if type is hotel
    //   } else if (accomodationType === "bnb") {
    //     fieldsToValidate.push(
    //       "business_meeting.location.country",
    //       "business_meeting.location.city",
    //       "business_meeting.location.street_name"
    //     );
    //   }
    // } else if (activeStep === 1) {
    //   fieldsToValidate = ["images"];
    // } else if (activeStep === 2) {
    //   fieldsToValidate = ["learning_info.title", "learning_info.description"];
    // } else if (activeStep === 3) {
    //   fieldsToValidate = ["availibility.start_date", "availibility.end_date"];
    // }

    // console.log("Form values: ", methods.getValues()); // Check current form values

    // const isStepValid = await trigger(fieldsToValidate); // Validate step-specific fields
    // console.log("Is Step Valid:", isStepValid);

    // if (isStepValid) {
    // }
    setActiveStep((prev) => prev + 1); // Move to next step if valid
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Pannel>
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <Typography variant="h2" className="text-black text-center">
          All fields are Mandetory
        </Typography>
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
