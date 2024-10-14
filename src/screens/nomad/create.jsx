import React from "react";
import { NavBar } from "@/src/sections";
import { StepperView } from "@/src/sections/nomad";

const NomadCreateScreen = React.memo(() => {
  return (
    <>
      <NavBar className="bg-primary static" />
      <StepperView />
    </>
  );
});

export default NomadCreateScreen;
