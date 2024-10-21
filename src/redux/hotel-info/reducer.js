import { createSlice } from "@reduxjs/toolkit";

import { createHotelInfo } from "./thunk";

const initialState = {
  isLoading: false,
  hotels: [],
  error: null,
  create: {
    isLoading: false,
    error: null,
    accessToken: null,
    user: null,
  },
  getById: {
    isLoading: false,
    error: null,
    HotelFacilities: {},
  },
  deleteById: {
    isLoading: false,
    error: null,
  },
  updateById: {
    isLoading: false,
    error: null,
  },
};

// ---------------------------------------------------------

export const hotelInfo = createSlice({
  name: "hotelInfo",
  initialState: initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createHotelInfo.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createHotelInfo.fulfilled, (state, action) => {
      console.log("paylod", action.payload);
      state.hotels = action.payload;
      state.create.accessToken = action.payload.accessToken;
      state.create.user = action.payload.user;
      state.create.isLoading = false;
    });
    builder.addCase(createHotelInfo.rejected, (state, action) => {
      state.create.error = action.error;
      state.create.isLoading = false;
    });
  },
});

export default hotelInfo.reducer;
