import { configureStore } from "@reduxjs/toolkit";

import hotelInfo from "./hotel-info/reducer";
import nomadProfile from "./nomad-profile/reducer";
import guest from "./guest/reducer";

import hotelFacilities from "./hotel-facilities/reducer";
import rooms from "./hotel-rooms/reducer";
import roomFacilities from "./room-facilities/reducer";
import eventAmenities from "./amenities/reducer";
import nomadEvents from "./events/reducer";
import hotelEvent from "./hotel-event/reducer";
import allEvents from "./all-events/reducer";
import bookings from "./bookings/reducer";
import eventThings from "./event-things-to-know/reducer";

const store = configureStore({
  reducer: {
    hotelFacilities,
    roomFacilities,
    hotelInfo,
    nomadProfile,
    guest,
    rooms,
    eventAmenities,
    hotelEvent,
    nomadEvents,
    allEvents,
    bookings,
    eventThings,
  },
});

export default store;
