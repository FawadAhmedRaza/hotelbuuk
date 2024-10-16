import React from "react";
import { Layout } from "@/src/sections";
import { StepperView } from "@/src/sections/nomad";

const NomadCreateScreen = React.memo(() => {
  return (
    <Layout isNavBg={true}>
      <StepperView />
    </Layout>
  );
});

export default NomadCreateScreen;
