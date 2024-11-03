"use client";

import { useEffect, useState } from "react";

import { redirect, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import axiosInstance, { endpoints } from "@/src/utils/axios";

import { Layout } from "@/src/sections";
import AcceptInvitationScreen from "@/src/screens/accept-invitation/accept-invitation-screen";
import Spinner from "@/src/components/ui/spinner";

const page = () => {
  const params = useSearchParams();

  const email = params.get("email");
  const isRegistered = params.get("isRegistered");
  const hotel = params.get("hotel");
  const hotelId = params.get("hotelId");
  const nomadId = params.get("nomadId");

  const [isLoading, setIsLoading] = useState(false);

  const addInternalNomad = async () => {
    try {
      setIsLoading(true);
      let data = {
        nomadId,
        hotelId,
      };
      const request = await axiosInstance.put(
        endpoints.hotel.inviteNomads,
        data
      );

      if (request?.status === 200) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    if (!isRegistered) {
      redirect(
        `/sign-up?email=${email}&isRegistered=false&hotel=${hotel}&hotelId=${hotelId}`
      );
    }

    if (isRegistered && nomadId && hotelId) {
      addInternalNomad();
    }
  }, [isRegistered]);

  if (isLoading) return <Spinner/>;

  return (
    <Layout isNavBg={true}>
      <AcceptInvitationScreen hotelName={hotel} />
    </Layout>
  );
};

export default page;
