import React from "react";

// Components and Others..
import { Layout, MeetOurPatners } from "../sections";
import { AllHotels, BookNow } from "../sections/hotels";
import HotelShowSection from "../sections/hotels/show-hotels/hotel-show-section";

const HotelsScreen = React.memo(() => {
  return (
    <Layout isNavBg={true}>
      <BookNow />
      {/* <AllHotels /> */}
      <HotelShowSection />
      <MeetOurPatners />
    </Layout>
  );
});

export default HotelsScreen;
