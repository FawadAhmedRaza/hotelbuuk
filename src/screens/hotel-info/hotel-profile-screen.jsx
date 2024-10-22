"use client";
import * as Yup from "yup";
import { Breadcrumb, Button, Pannel } from "@/src/components";
import Tabs from "@/src/components/tabs";
import React, { useEffect, useState } from "react";
import HotelProfile from "./components/hotel-profile";
import HotelImages from "./components/hote-images";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";
import { getAllHotelFacilities } from "@/src/redux/hotel-facilities/thunk";

const HotelProfileScreen = ({ defaultValues, isEdit }) => {
  const [activeTabs, setActiveTabs] = useState("hotel-info");

  console.log("profile screen", defaultValues);

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

  const { user, setUser } = useAuthContext();

  console.log(user, "user");

  const dispatch = useDispatch();

  console.log("default values", defaultValues);

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const finalData = {
        ...data,
        user_id: user?.id,
      };

      const response = await axiosInstance.post(
        endpoints.hotel.create,
        finalData
      );
      if (response?.status === 201) {
        let { accessToken, user } = response?.data || {};
        await setUser(user, accessToken);
        enqueueSnackbar("Hotel info created", { variant: "success" });
        router.push("/hotel-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  });

  const TABS = [
    {
      label: "Hotel Info",
      value: "hotel-info",
      component: <HotelProfile />,
    },
    {
      label: "Hotel Images",
      value: "hotel-images",
      component: <HotelImages />,
    },
  ];

  return (
    <Pannel>
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <div className="w-full">
          <Tabs
            TABS={TABS}
            activeTab={activeTabs}
            setActiveTab={setActiveTabs}
          />
        </div>

        <div className="flex justify-end my-5">
          <Button>Submit</Button>
        </div>
      </RHFFormProvider>
    </Pannel>
  );
};

export default HotelProfileScreen;
