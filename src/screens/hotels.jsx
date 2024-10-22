import React from "react";

// Components and Others..
import { Layout, MeetOurPatners } from "../sections";
import { AllHotels, BookNow } from "../sections/hotels";

const HotelsScreen = React.memo(() => {
  return (
    <Layout isNavBg={true}>
      <BookNow />
      <AllHotels />
      <MeetOurPatners />
    </Layout>
  );
});

export default HotelsScreen;
