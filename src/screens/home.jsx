import React from "react";
import {
  Banner,
  Booking,
  BookingSteps,
  HeroSection,
  Layout,
  MeetOurPatners,
} from "../sections";
import { Hotels } from "../sections/hotels";

const HomeScreen = React.memo(() => {
  return (
    <main className="relative">
      <Layout>
        <HeroSection />
        <Booking />
        <Hotels />
        <Banner />
        <BookingSteps />
        <MeetOurPatners />
      </Layout>
    </main>
  );
});
export default HomeScreen;
