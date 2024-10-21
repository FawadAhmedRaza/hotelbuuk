import React from "react";
import { Layout } from "@/src/sections";
import { RoomStepperView } from "@/src/sections/hotel-dashboard-sections/room";

const RoomCreateScreen = React.memo(() => {
  return (
    <Layout isNavBg={true}>
      <RoomStepperView />
    </Layout>
  );
});

export default RoomCreateScreen;
