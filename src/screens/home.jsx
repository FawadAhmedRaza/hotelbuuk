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

const HomeScreen = React.memo(() => {
  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      <Booking />
      <Hotels />
      <Banner />
      <BookingSteps />
      <MeetOurPatners />
      <Footer />
    </main>
  );
});
export default HomeScreen;
