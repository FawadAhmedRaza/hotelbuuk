import React from "react";
import {
  Banner,
  Booking,
  BookingSteps,
  Destinations,
  Footer,
  HeroSection,
  MeetOurPatners,
  MissionStatement,
  NavBar,
  Vision,
} from "../sections";
import { Hotels } from "../sections/hotels";
import { HeadingBanner } from "../components";
import { HotelLocation, NearByHotels } from "../sections/hotel-details";

const AboutScreen = React.memo(() => {
  return (
    <main className="relative">
      <NavBar />
      <HeadingBanner
        heading="About Us"
        text="the printing and typesetting industry. Lorem Ipsum has bee"
        className="bg-about"
      />
      <MissionStatement />
      <Vision />
      <HotelLocation />
      <Destinations />
      <Footer />
    </main>
  );
});
export default AboutScreen;
