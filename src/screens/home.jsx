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
import { Pannel } from "../components";

const HomeScreen = React.memo(() => {
  return (
    <main className="relative">
      <Layout>
        <HeroSection />
        <Pannel className=" md:hidden block">
          <Booking />
        </Pannel>
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
