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
import { BusinessFactsSwiper } from "../sections/business-facts-swiper";

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
        {/* <BusinessFacts /> */}
        <BusinessFactsSwiper />
        <BookingSteps />
        <MeetOurPatners />
      </Layout>
    </main>
  );
});
export default HomeScreen;
