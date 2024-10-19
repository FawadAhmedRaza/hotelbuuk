import { configureStore } from "@reduxjs/toolkit";

import hotelFacilities from "./hotel-facilities/reducer";

const store = configureStore({
  reducer: {
    hotelFacilities,
  },
});

export default store;
