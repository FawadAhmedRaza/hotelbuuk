"use client";
import React, { useEffect, useState } from "react";

import { Destinations, Layout, MissionStatement, Vision } from "../sections";
import { HeadingBanner } from "../components";
import { HotelLocation } from "../sections/hotel-details";
import { getAboutUs } from "../actions/about.action";
import { MissionStatementSkeleton } from "../components/StaticContentSkeletons/mission-skeleton";
import { VisionSkeleton } from "../components/StaticContentSkeletons/vision-skeleton";

const AboutScreen = React.memo(() => {
  const [isAboutLoading, setIsAboutLoading] = useState(true);
  const [aboutUsContent, setAboutUsContent] = useState([]);

  const fetchAboutUs = async () => {
    try {
      setIsAboutLoading(true);
      const response = await getAboutUs();
      setAboutUsContent(response.aboutUs);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsAboutLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);


  return (
    <main className="relative">
      <Layout>
        <HeadingBanner
          heading="About Us"
          text="Experience luxury and comfort in the heart of the city, where every stay feels like a getaway."
          className="bg-about"
        />
        {isAboutLoading && (
          <>
            <MissionStatementSkeleton />
            <VisionSkeleton />
          </>
        )}

        {aboutUsContent?.map((about, index) => {
          const isOdd = index % 2 === 0;
          return isOdd ? (
            <MissionStatement about={about} />
          ) : (
            <Vision about={about} />
          );
        })}
        {/* <MissionStatement />
        <Vision /> */}
        <HotelLocation />
        <Destinations />
      </Layout>
    </main>
  );
});

export default AboutScreen;
