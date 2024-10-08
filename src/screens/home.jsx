import React from "react";
import { Banner, Booking, HeroSection, NavBar } from "../sections";

const HomeScreen = React.memo(() => {
  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      <Booking />
      <Banner />
    </main>
  );
});
export default HomeScreen;
