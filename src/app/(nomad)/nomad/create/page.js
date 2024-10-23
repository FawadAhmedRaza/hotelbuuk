import React from "react";
import NomadCreateScreen from "@/src/screens/nomad/create";
import { getCities, getCountries } from "@/src/libs/helper";

const page = async () => {
  const city = await getCities("Pakistan");

  return <NomadCreateScreen />;
};

export default page;
