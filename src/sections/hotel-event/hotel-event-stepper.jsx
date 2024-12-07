"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";

import { Pannel, Stepper } from "@/src/components";
import { BussinessMeeting } from "./bussiness-meeting";
import { GuestLearn } from "./guest";
import { SetAvailability } from "./availabilty";
import { Pricing } from "./pricing";
import { useDispatch, useSelector } from "react-redux";
import { getAllAmenities } from "@/src/redux/amenities/thunk";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { enqueueSnackbar } from "notistack";
import {
  getNomadsProfile,
  getSingleNomad,
} from "@/src/redux/nomad-profile/thunk";
import {
  createHotelEvent,
  updateHotelEventById,
} from "@/src/redux/hotel-event/thunk";
import { useRouter, useSearchParams } from "next/navigation";
import { paths } from "@/src/contants";
import { ThingsToKnow } from "./things-to-know";
import {
  getAllCancellationPolicy,
  getAllEventRules,
  getAllEventSafetyAndProperty,
} from "@/src/redux/event-things-to-know/thunk";
import { Itinerary } from "./itinerary";
import { SelectRoom } from "./select-room";
import { getRooms } from "@/src/redux/hotel-rooms/thunk";

export const HotelEventStepper = ({ defaultValues, isEdit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const params = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const router = useRouter();
  const nomadId = params.get("nomad_id") || "";

  console.log("Default Data", defaultValues);

  const { isLoading } = useSelector((state) => state.hotelEvent.create);
  const { isLoading: updateLoading } = useSelector(
    (state) => state.hotelEvent.updateById
  );

  const checkBoxSchema = (amenities) => {
    return Yup.object().shape(
      amenities.reduce((schema, amenity) => {
        // schema[amenity] = Yup.boolean().required(`${amenity} is required`);
        schema[amenity] = Yup.boolean().optional();
        return schema;
      }, {})
    );
  };

  const eventSchema = Yup.object().shape({
    business_meeting: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(50, "Title must be at most 30 characters")
        .min(3, "Title must be at least 3 characters"),
      description: Yup.string()
        .required("Description is required")
        .min(3, "Description must be at least 3 characters"),
      official_name: Yup.string()
        .required("Official name is required")
        .max(30, "Official name must be at most 30 characters")
        .min(3, "Official name must be at least 3 characters"),
      business_category: Yup.string().required("Business category is required"),
      amenities: Yup.array().optional(),
      nomad_id: Yup.string().required("Please select nomad"),
    }),
    room_id: Yup.string().required("Room is required"),
    rules: Yup.array().optional(),
    safeties: Yup.array().optional(),
    cancelPolicies: Yup.array().optional(),
    topics: Yup.array().min(1, "At least one topic is required").required(),
    availibility: Yup.object().shape({
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
      rules: Yup.lazy((value) => checkBoxSchema(Object.keys(value || {}))),
    }),
    itinerary: Yup.array()
      .min(1, "At least one Location is required")
      .required(),
    price: Yup.string().required("Price is required"),
  });

  const methods = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: isEdit
      ? defaultValues
      : {
          business_meeting: {
            title: "",
            description: "",
            official_name: "",
            business_category: "",
            amenities: [],
          },
          room_id: "",

          topics: [],
          availibility: {
            start_date: "",
            end_date: "",
            rules: {},
          },
        },
  });

  const { trigger, handleSubmit, setValue } = methods;

  const fetchNomads = async () => {
    try {
      await dispatch(getNomadsProfile()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleNomad = async () => {
    try {
      await dispatch(
        getSingleNomad(nomadId || defaultValues?.business_meeting?.nomad_id)
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAmenities = async () => {
    try {
      await dispatch(getAllAmenities(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventRules = async () => {
    try {
      await dispatch(getAllEventRules(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventSafetyProperty = async () => {
    try {
      await dispatch(getAllEventSafetyAndProperty(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventPolicies = async () => {
    try {
      await dispatch(getAllCancellationPolicy(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRooms = async () => {
    try {
      await dispatch(getRooms(user?.hotels?.[0].id)).unwrap();
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchSingleNomad();
    fetchNomads();
    fetchAmenities();
    fetchEventRules();
    fetchEventPolicies();
    fetchEventSafetyProperty();
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!isEdit && nomadId) {
      setValue("business_meeting.nomad_id", nomadId);
    }
    if (isEdit) {
      setValue(
        "business_meeting.nomad_id",
        defaultValues?.business_meeting?.nomad_id
      );
    }
  }, []);

  const steps = [
    {
      label: "Bussiness Meeting Info",
      icon: "mdi:business-outline",
      value: "bussiness",
      component: <BussinessMeeting isEdit={isEdit} />,
    },
    {
      label: "Room",
      icon: "cil:room",
      value: "room",
      component: <SelectRoom />,
    },
    {
      label: "What Guest will Learn",
      icon: "octicon:person-16",
      value: "guest",
      component: <GuestLearn />,
    },
    {
      label: "Itinerary Locations",
      icon: "lineicons:route-1",
      value: "itinerary",
      component: <Itinerary />,
    },
    {
      label: "Things to know",
      icon: "octicon:person-16",
      value: "thingsToKnow",
      component: <ThingsToKnow />,
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
    const fieldsToValidate = [];

    if (activeStep === 0) {
      fieldsToValidate.push(
        "business_meeting.title",
        "business_meeting.description",
        "business_meeting.official_name",
        "business_meeting.business_category",
        "business_meeting.amenities",
        "business_meeting.nomad_id"
      );
    } else if (activeStep === 1) {
      fieldsToValidate.push("room_id");
    } else if (activeStep === 2) {
      fieldsToValidate.push("topics");
    } else if (activeStep === 3) {
      fieldsToValidate.push("itinerary");
    } else if (activeStep === 5) {
      fieldsToValidate.push("availibility.start_date", "availibility.end_date");
    }

    const isStepValid = await trigger(fieldsToValidate); // Validate step-specific fields

    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const finalData = {
      ...data,
      user_id: user?.id,
    };
    if (!isEdit) {
      try {
        await dispatch(createHotelEvent(finalData)).unwrap();
        enqueueSnackbar("hotel event created", { variant: "success" });
        router.push(paths.hotelDashboard.events.root);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    } else {
      try {
        await dispatch(
          updateHotelEventById({ id: defaultValues?.id, data: finalData })
        ).unwrap();
        enqueueSnackbar("Updated successfully", { variant: "success" });
        router.push(paths.hotelDashboard.events.root);
      } catch (error) {
        console.log("form error", error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
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
          handleBack={() => setActiveStep((prev) => prev - 1)}
          isLastStep={activeStep === steps.length - 1}
          loading={isEdit ? updateLoading : isLoading}
        />
      </RHFFormProvider>
    </Pannel>
  );
};
