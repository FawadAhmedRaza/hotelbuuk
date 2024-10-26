"use client";

import { redirect, useSearchParams } from "next/navigation";

import { Layout } from "@/src/sections";
import AcceptInvitationScreen from "@/src/screens/accept-invitation/accept-invitation-screen";
import { useEffect } from "react";

const page = () => {
  const params = useSearchParams();

  const email = params.get("email");
  const isRegistered = params.get("isRegistered");
  const hotel = params.get("hotel");
  const hotelId = params.get("hotelId");

  useEffect(() => {
    if (!isRegistered) {
      redirect(
        `sign-up?email=${email}&isRegistered=false&hotel=${hotel}&hotelId=${hotelId}`
      );
    }
  }, [isRegistered]);

  return (
    <Layout isNavBg={true}>
      <AcceptInvitationScreen hotelName={hotel} />
    </Layout>
  );
};

export default page;
