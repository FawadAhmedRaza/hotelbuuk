"use client";

import React, { useEffect, useState } from "react";
import SideFilterSection from "./side-filter-section";
import { Pannel } from "@/src/components";
import HotelCard from "./hotel-card";
import HotelTab from "./hotel-tab";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/src/redux/all-events/thunk";
import {
  eventsFilter,
  filterEvents,
  filterEventsByDateAndDestination,
} from "@/src/libs/helper";
import { useBoolean } from "@/src/hooks";
import MobileFilter from "./mob-filter";
import { useSearchParams } from "next/navigation";

const HotelShowSection = () => {
  const initialState = {
    event_name: "",
    price: Infinity,
    rating: [],
    location: [],
    nomad: [],
  };

  const [filters, setFilters] = useState(initialState);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const searchParams = useSearchParams();

  // Extract query parameters from the URL
  const destination = searchParams.get("destination") || "";
  const checkIn = searchParams.get("check_in") || "";
  const checkOut = searchParams.get("check_out") || "";

  const { events, isLoading } = useSelector((state) => state.allEvents);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchEvents() {
      await dispatch(getAllEvents()).unwrap();
    }

    fetchEvents();
  }, []);


  useEffect(() => {
    if (!isLoading && events.length > 0) {
      const filteredResults = eventsFilter(events, filters);
      setFilteredEvents(filteredResults);
    }
  }, [filters, events, isLoading]);

  useEffect(() => {
    if (!isLoading && events.length > 0) {
      const finalFilteredResults = filterEventsByDateAndDestination(
        events,
        checkIn,
        checkOut,
        destination
      );

      setFilteredEvents(finalFilteredResults);
    }
  }, [events, isLoading, checkIn, checkOut, destination]);

  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();
  {
    isOpen && (
      <MobileFilter
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={toggleDrawer}
        setFilters={setFilters}
      />
    );
  }

  return (
    <Pannel className="!pt-0 flex gap-7">
      <div className=" md:w-[25%] sm:flex hidden">
        <SideFilterSection setFilters={setFilters} />
      </div>

      <div className=" md:w-[75%]">
        <HotelTab
          filteredEvents={filteredEvents}
          setFilters={setFilters}
          toggleDrawer={toggleDrawer}
        />
      </div>
    </Pannel>
  );
};

export default HotelShowSection;
