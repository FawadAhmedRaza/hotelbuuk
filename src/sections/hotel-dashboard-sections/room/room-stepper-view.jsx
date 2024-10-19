// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { RHFFormProvider } from "@/src/components/hook-form";
// import { Pannel, Stepper, Typography } from "@/src/components";
// import { RoomInfo } from "./room-info";
// import ImageUploader from "../../nomad/stepper-view/image-uploader";

// export const RoomStepperView = () => {
//   const [currentSteps, setCurrentSteps] = useState([]);
//   const [activeStep, setActiveStep] = useState(0);

//   const checkBoxSchema = (amenities) => {
//     return Yup.object().shape(
//       amenities.reduce((schema, amenity) => {
//         schema[amenity] = Yup.boolean().required(`${amenity} is required`);

//         return schema;
//       }, {})
//     );
//   };

//   const RoomSchema = Yup.object().shape({
//     room_info: Yup.object().shape({
//       room_name: Yup.string().required("Room name is required"),
//       description: Yup.string().required("Description is required"),
//       maximum_occupancy: Yup.number().required("Maximum occupancy is required"),
//       room_type: Yup.string().required("Room type is required"),
//       price: Yup.number()
//         .required("Pricing is required")
//         .positive("Pricing must be a positive number"),
//       room_facilities: Yup.lazy((value) =>
//         checkBoxSchema(Object.keys(value || {}))
//       ),
//     }),
//     images: Yup.array()
//       .min(10, "At least ten images are required")
//       .required("Files are required"),
//   });

//   const methods = useForm({
//     resolver: yupResolver(RoomSchema),
//     // defaultValues: NomadSchema.default(),
//     defaultValues: {
//       room_info: {
//         room_name: "",
//         description: "",
//         maximum_occupancy: "",
//         room_type: "",
//         price: "",
//         room_facilities: {},
//       },
//       images: [],
//     },
//   });

//   const {
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = methods;

//   console.log("errors", errors);

//   const onSubmit = handleSubmit(async (data) => {
//     console.log("Form submitted: ", data);
//   });

//   const steps = [
//     {
//       label: "Room Info",
//       icon: "solar:home-outline",
//       value: "bussiness",
//       component: <RoomInfo />,
//     },
//     {
//       label: "Upload Images",
//       icon: "ph:images",
//       value: "images",
//       component: <ImageUploader />,
//     },
//   ];

//   // NEW HANDLE NEXT
//   const handleNext = async () => {
//     // Get the current accommodation type
//     const accommodationType = methods.watch("room_info.room_type");
//     let fieldsToValidate = [];
//     if (activeStep === 0) {
//       // Step 1: Validate room info fields
//       fieldsToValidate = [
//         "room_info.room_name",
//         "room_info.description",
//         "room_info.maximum_occupancy",
//         "room_info.room_type",
//         "room_info.price",
//       ];
//       // If there are room facilities, validate those as well
//       const roomFacilities = methods.getValues("room_info.room_facilities");
//       if (roomFacilities && Object.keys(roomFacilities).length > 0) {
//         fieldsToValidate.push(
//           ...Object.keys(roomFacilities).map(
//             (facility) => `room_info.room_facilities.${facility}`
//           )
//         );
//       }
//     } else if (activeStep === 1) {
//       // Step 2: Validate images
//       fieldsToValidate = ["images"];
//     }
//     // Log current form values
//     console.log("Form values: ", methods.getValues());
//     // Validate step-specific fields
//     const isStepValid = await methods.trigger(fieldsToValidate);
//     console.log("Is Step Valid:", isStepValid);
//     // Move to the next step if valid
//     if (isStepValid) {
//       setActiveStep((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   return (
//     <Pannel>
//       <RHFFormProvider methods={methods} onSubmit={onSubmit}>
//         <Stepper
//           steps={currentSteps}
//           activeStep={activeStep}
//           setActiveStep={setActiveStep}
//           handleNext={handleNext}
//           handleBack={handleBack}
//           isLastStep={activeStep === steps.length - 1}
//         />
//       </RHFFormProvider>
//     </Pannel>
//   );
// };

// SECOND******************************************************

"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";
import { Pannel, Stepper, Typography } from "@/src/components";
import { RoomInfo } from "./room-info";
import ImageUploader from "../../nomad/stepper-view/image-uploader";

// Components and Others...
// import { Pannel, Stepper, Typography } from "@/src/components";
// import { BussinessMeeting } from "./bussiness-meeting";
// import { GuestLearn } from "./guest";
// import { SetAvailability } from "./availabilty";
// import { Pricing } from "./pricing";
// import ImageUploader from "./image-uploader";

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
    images: Yup.array()
      .min(10, "At least ten images are required")
      .required("Files are required"),
  });

  const methods = useForm({
    resolver: yupResolver(RoomSchema),
    // defaultValues: NomadSchema.default(),
    defaultValues: {
      room_info: {
        room_name: "",
        description: "",
        maximum_occupancy: "",
        room_type: "",
        price: "",
        room_facilities: {},
      },
      images: [],
    },
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

  // NEW HANDLE NEXT
  const handleNext = async () => {
    // Get the current accommodation type
    const accommodationType = methods.watch("room_info.room_type");
    let fieldsToValidate = [];
    if (activeStep === 0) {
      // Step 1: Validate room info fields
      fieldsToValidate = [
        "room_info.room_name",
        "room_info.description",
        "room_info.maximum_occupancy",
        "room_info.room_type",
        "room_info.price",
      ];
      // If there are room facilities, validate those as well
      const roomFacilities = methods.getValues("room_info.room_facilities");
      if (roomFacilities && Object.keys(roomFacilities).length > 0) {
        fieldsToValidate.push(
          ...Object.keys(roomFacilities).map(
            (facility) => `room_info.room_facilities.${facility}`
          )
        );
      }
    } else if (activeStep === 1) {
      // Step 2: Validate images
      fieldsToValidate = ["images"];
    }
    // Log current form values
    console.log("Form values: ", methods.getValues());
    // Validate step-specific fields
    const isStepValid = await methods.trigger(fieldsToValidate);
    console.log("Is Step Valid:", isStepValid);
    // Move to the next step if valid
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
