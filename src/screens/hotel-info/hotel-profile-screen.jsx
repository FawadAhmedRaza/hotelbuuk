"use client";
import * as Yup from "yup";
import {
  Breadcrumb,
  Button,
  DeleteModal,
  Pannel,
  Typography,
} from "@/src/components";
import Tabs from "@/src/components/tabs";
import React, { useEffect, useState } from "react";
import HotelProfile from "./components/hotel-profile";
import HotelImages from "./components/hote-images";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";
import { getAllHotelFacilities } from "@/src/redux/hotel-facilities/thunk";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { enqueueSnackbar } from "notistack";
import { useBoolean } from "@/src/hooks";
import { deleteNomadProfile } from "@/src/redux/nomad-profile/thunk";

const HotelProfileScreen = ({ defaultValues, isEdit }) => {
  const [activeTabs, setActiveTabs] = useState("hotel-info");

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
    facilities: Yup.array().optional(),
    images: Yup.array().optional(),
    // .min(8, "At least Eight images are required")
    // .required("Files are required"),
  });

  const { user, setUser, logout } = useAuthContext();
  const { isOpen, setIsOpen, toggleDrawer } = useBoolean();
  const { isLoading } = useSelector((state) => state.nomadProfile.deleteById);

  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(HotelSchema),
    defaultValues: isEdit && defaultValues,
  });

  const {
    handleSubmit,
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
      let imageUrls = [];
      let files = [];

      data.images?.forEach((item) => {
        if (item.url && !item?.file) {
          imageUrls.push(item);
        } else if (item.file) {
          files.push({ file: item?.file, name: item?.name });
        }
      });
      let firstArrayIds = imageUrls?.map((item) => item?.id);
      let secondArrayIds = data.hotelImages?.map((item) => item?.id);
      let remaingImages = secondArrayIds.filter(
        (item) => !firstArrayIds.includes(item)
      );
      let deletedImages = data?.hotelImages?.filter((item) =>
        remaingImages.includes(item?.id)
      );

      const formData = new FormData();
      const images = files?.map((da) => da?.file);
      const names = files?.map((da) => da?.name);

      for (const key in finalData) {
        if (
          finalData[key] !== null &&
          finalData[key] !== undefined &&
          key !== "images"
        ) {
          if (
            typeof finalData[key] === "object" &&
            !(finalData[key] instanceof File)
          ) {
            formData.append(key, JSON.stringify(finalData[key]));
          } else {
            formData.append(key, finalData[key]);
          }
        }
      }
      delete formData.hotelImages;

      formData.append("imagesUrl", JSON.stringify(imageUrls));
      formData.append("deletedImages", JSON.stringify(deletedImages));
      images?.forEach((file) => formData.append("files", file));
      images.forEach((file) =>
        formData.append("imagesNames", JSON.stringify(names))
      );

      const response = await axiosInstance.put(
        endpoints.hotel.update(defaultValues?.id),
        formData
      );
      if (response?.status === 201) {
        let { accessToken, user } = response?.data || {};
        await setUser(user, accessToken);
        enqueueSnackbar("Hotel info updated", { variant: "success" });
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

  const handleDelete = async () => {
    try {
      await dispatch(deleteNomadProfile(user?.id)).unwrap();
      logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  return (
    <Pannel className="!py-8">
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <Breadcrumb title="Update Hotel profile" />
        {/* <div className="w-full mt-4">
          <Tabs
            TABS={TABS}
            activeTab={activeTabs}
            setActiveTab={setActiveTabs}
          />
        </div> */}

        <HotelProfile />

        {/* {activeTabs === "hotel-images" && ( */}
          <div className="flex justify-end my-5 gap-3">
            <Button
              type="button"
              className="!bg-red-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              Delete profile
            </Button>
            <Button className="!bg-black" loading={isSubmitting} type="submit">
              {isEdit ? "Save" : "Submit"}
            </Button>
          </div>
        {/* )} */}
      </RHFFormProvider>
      {isOpen && (
        <DeleteModal
          isLoading={isLoading}
          title="Delete Profile"
          isOpen={isOpen}
          onClose={toggleDrawer}
          handleDelete={handleDelete}
        >
          <Typography variant="p">
            Are you sure you want to delete your profile ? this action will
            delete all of your data?
          </Typography>
        </DeleteModal>
      )}
    </Pannel>
  );
};

export default HotelProfileScreen;
