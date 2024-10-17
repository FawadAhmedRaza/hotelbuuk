import React from "react";
import { Layout } from "@/src/sections";
import { StepperView } from "@/src/sections/nomad";


const RoomCreateScreen = React.memo(() => {
  return (
    <Layout isNavBg={true}>
      <StepperView />
    </Layout>
  );
});

export default RoomCreateScreen;
