import { configureStore } from "@reduxjs/toolkit";

import hotelFacilities from "./hotel-facilities/reducer";
import hotelInfo from "./hotel-info/reducer";
import rooms from "./hotel-rooms/reducer";
import nomadProfile from "./nomad-profile/reducer";
import roomFacilities from "./room-facilities/reducer";
import eventAmenities from "./amenities/reducer";

const store = configureStore({
  reducer: {
    hotelFacilities,
    roomFacilities,
    hotelInfo,
    nomadProfile,
    rooms,
    eventAmenities,
  },
});

export default store;
