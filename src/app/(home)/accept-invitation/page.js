"use client";

import { Pannel, Typography } from "@/src/components";
import AcceptInvitationScreen from "@/src/screens/accept-invitation/accept-invitation-screen";
import { Layout } from "@/src/sections";
import { useSearchParams } from "next/navigation";

const page = () => {
  const params = useSearchParams();
  console.log("params", params);

  return (
    <Layout isNavBg={true}>
      <AcceptInvitationScreen />
    </Layout>
  );
};

export default page;
