"use client";

import { Pannel, Typography } from "@/src/components";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
    <Pannel>
      <div className="flex justify-center items-center">
        <h1>Congratulations</h1>
        <Typography variant="h6">
          You have joined hotel as their internal nomad
        </Typography>
      </div>
    </Pannel>
  );
};

export default page;
