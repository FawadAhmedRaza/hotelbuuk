"use client";

import { Pannel, Typography } from "@/src/components";
import AcceptInvitationScreen from "@/src/screens/accept-invitation/accept-invitation-screen";
import { Layout } from "@/src/sections";
import { useSearchParams } from "next/navigation";

const page = () => {
  const params = useSearchParams();

  const email = params.get("email");
  const isRegistered = params.get("isRegistered");

  console.log("params", email, isRegistered);

  useEffect(() => {
    if (!isRegistered) {
      redirect(`/sign-up?email=${email}&userType="NOMAD"`);
    }
  }, [isRegistered]);

  return (
    <Layout isNavBg={true}>
      <AcceptInvitationScreen />
    </Layout>
  );
};

export default page;
