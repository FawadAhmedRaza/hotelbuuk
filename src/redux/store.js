import { configureStore } from "@reduxjs/toolkit";

import hotelFacilities from "./hotel-facilities/reducer";
import hotelInfo from "./hotel-info/reducer";
import nomadProfile from "./nomad-profile/reducer";

const store = configureStore({
  reducer: {
    hotelFacilities,
    hotelInfo,
    nomadProfile,
  },
});

export default store;
