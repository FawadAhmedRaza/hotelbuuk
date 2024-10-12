import React from "react";
import {
  Banner,
  Booking,
  BookingSteps,
  Footer,
  HeroSection,
  MeetOurPatners,
  NavBar,
} from "../sections";
import { Hotels } from "../sections/hotels";
import { BookingTest } from "../sections/booking-test";

const HomeScreen = React.memo(() => {
  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      <Booking />
      {/* <BookingTest /> */}
      <Hotels />
      <Banner />
      <BookingSteps />
      <MeetOurPatners />
      <Footer />
    </main>
  );
});
export default HomeScreen;
