import React from "react";
import {
  Banner,
  Booking,
  BookingSteps,
  Footer,
  HeroSection,
  MeetOurPatners,
  MissionStatement,
  NavBar,
  Vision,
} from "../sections";
import { Hotels } from "../sections/hotels";
import { HeadingBanner } from "../components";

const AboutScreen = React.memo(() => {
  return (
    <main className="relative">
      <NavBar className="bg-primary static" />
      <HeadingBanner
        heading="About Us"
        text="the printing and typesetting industry. Lorem Ipsum has bee"
        className="bg-about"
      />{" "}
      <MissionStatement />
      <Vision />
      <Footer />
    </main>
  );
});
export default AboutScreen;
