"use client";
import Tabs from "@/src/components/tabs";
import React, { useState } from "react";
import HotelCard from "./hotel-card";
import HotelTabComponent from "./tab-components";
import BnBCard from "./bnb-card";

const HotelTab = ({ filteredEvents, toggleDrawer, setFilters }) => {
  const TABS = [
    {
      value: "tab1",
      label: "Hotels",
      component: (
        <div>
          <HotelCard filteredEvents={filteredEvents} />
        </div>
      ),
    },
    {
      value: "tab2",
      label: "B&B",
      component: (
        <div>
          <BnBCard filteredEvents={filteredEvents} />
        </div>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(TABS[0].value); // Initialize with the first tab

  return (
    <div>
      <HotelTabComponent
        TABS={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleDrawer={toggleDrawer}
        setFilters={setFilters}
      />
    </div>
  );
};

export default HotelTab;
