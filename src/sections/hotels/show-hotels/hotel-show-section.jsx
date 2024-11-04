"use client";

import React, { useEffect, useState } from "react";
import SideFilterSection from "./side-filter-section";
import { Pannel } from "@/src/components";
import HotelCard from "./hotel-card";
import HotelTab from "./hotel-tab";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/src/redux/all-events/thunk";
import { eventsFilter, filterEvents } from "@/src/libs/helper";
import { useBoolean } from "@/src/hooks";
import MobileFilter from "./mob-filter";

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

  const { events, isLoading } = useSelector((state) => state.allEvents);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchEvents() {
      await dispatch(getAllEvents()).unwrap();
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const filteredResults = events.filter((event) => {
        const titleMatches = event?.title
          ?.toLowerCase()
          .includes(filters?.event_name?.toLowerCase());

        // Price validation
        const priceValid =
          filters.price !== null
            ? parseFloat(event.price) <= filters.price
            : true;

        // Rating validation
        const eventRating = (event?.hotel && event.hotel?.stars) || 0; // Default to 0 if no rating
        const ratingValid =
          filters.rating.length > 0
            ? filters.rating.includes(eventRating)
            : true;

        // Location validation
        const eventLocation = event.city || event.hotel?.city;
        const locationValid =
          filters.location.length > 0
            ? filters.location.includes(eventLocation)
            : true;

        // Nomad validation
        const nomadValid =
          filters.nomad.length > 0
            ? filters.nomad.includes(event.nomad_id)
            : true;

        // Return true if all conditions are met
        return (
          titleMatches &&
          priceValid &&
          ratingValid &&
          locationValid &&
          nomadValid
        );
      });

      setFilteredEvents(filteredResults);
    }
  }, [filters, events, isLoading]);

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
            onClick={onClick}
          filteredEvents={filteredEvents}
          setFilters={setFilters}
          toggleDrawer={toggleDrawer}
        />
      </div>
    </Pannel>
  );
};

export default HotelShowSection;
