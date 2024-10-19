import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const page = () => {
  useEffect(() => {
    redirect("/hotel-dashboard");
  });

  return;
};

export default page;
