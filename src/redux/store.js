import { configureStore } from "@reduxjs/toolkit";

import hotelFacilities from "./hotel-facilities/reducer";
import hotelInfo from "./hotel-info/reducer";

const store = configureStore({
  reducer: {
    hotelFacilities,
    hotelInfo,
  },
});

export default store;
