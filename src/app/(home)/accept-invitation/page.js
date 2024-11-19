"use client";

import { useEffect, useState } from "react";

import { redirect, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import axiosInstance, { endpoints } from "@/src/utils/axios";

import { Layout } from "@/src/sections";
import AcceptInvitationScreen from "@/src/screens/accept-invitation/accept-invitation-screen";
import Spinner from "@/src/components/ui/spinner";
import RejectInvitationScreen from "@/src/screens/accept-invitation/reject-Invitation-screen";

const page = () => {
  const params = useSearchParams();

  const email = params.get("email");
  const isRegistered = params.get("isRegistered");
  const hotel = params.get("hotel");
  const hotelId = params.get("hotelId");
  const nomadId = params.get("nomadId");
  const isRejected = params.get("status");

  const [isLoading, setIsLoading] = useState(false);

  // for request accepted
  const addInternalNomad = async () => {
    try {
      setIsLoading(true);
      let data = {
        nomadId,
        hotelId,
        invite_status: "ACCEPTED",
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

  // for request rejected
  const rejectInvitationRequest = async () => {
    setIsLoading(true);
    try {
      let data = {
        nomadId,
        hotelId,
        invite_status: "REJECTED",
      };
      // const request = await axiosInstance.post(
      //   endpoints.hotel.rejecteRequest,
      //   data
      // );
      const request = await axiosInstance.put(
        endpoints.hotel.inviteNomads,
        data
      );
      if (request?.status === 200) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isRegistered && !isRejected) {
      redirect(
        `/sign-up?email=${email}&isRegistered=false&hotel=${hotel}&hotelId=${hotelId}`
      );
    }
    // for rejection
    if (isRejected === "REJECTED" && !isRegistered) {
      rejectInvitationRequest();
    }
    // for accepted
    if (isRegistered && nomadId && hotelId) {
      addInternalNomad();
    }
    if (isRegistered === "DIRECT_EMAIL") {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <Layout isNavBg={true}>
      {isRegistered ? (
        <AcceptInvitationScreen hotelName={hotel} />
      ) : (
        <RejectInvitationScreen hotelName={hotel} />
      )}
    </Layout>
  );
};

export default page;
