import React from "react";
import SideFilterSection from "./side-filter-section";
import { Pannel } from "@/src/components";
import HotelCard from "./hotel-card";
import HotelTab from "./hotel-tab";

const HotelShowSection = () => {
  return (
    <Pannel className="!pt-0 flex gap-7">
      <div className=" md:w-[25%]">
        <SideFilterSection />
      </div>
      <div className=" md:w-[75%]">
      <HotelTab/>

      </div>
    </Pannel>
  );
};

export default HotelShowSection;
