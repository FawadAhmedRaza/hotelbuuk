"use client"
import React from "react";

import { Destinations, Layout, MissionStatement, Vision } from "../sections";
import { HeadingBanner } from "../components";
import { HotelLocation } from "../sections/hotel-details";

const AboutScreen = React.memo(() => {
  return (
    <main className="relative">
      <Layout>
        <HeadingBanner
          heading="About Us"
          text="the printing and typesetting industry. Lorem IpsumIpsum has bee"
          className="bg-about"
        />
        <MissionStatement />
        <Vision />
        <HotelLocation />
        <Destinations />
      </Layout>
    </main>
  );
});

export default AboutScreen;
