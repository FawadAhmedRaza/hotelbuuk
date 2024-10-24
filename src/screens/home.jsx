import React from "react";
import {
  Banner,
  Booking,
  BookingSteps,
  BusinessFacts,
  HeroSection,
  Layout,
  MeetOurPatners,
  PreviewHotelsSection,
} from "../sections";

const HomeScreen = React.memo(() => {
  return (
    <main className="relative">
      <Layout>






        <HeroSection />
        <Booking />
        <PreviewHotelsSection />
        <Banner />
        <BusinessFacts />
        <BookingSteps />
        <MeetOurPatners />
      </Layout>
    </main>
  );
});
export default HomeScreen;
