import { createSlice } from "@reduxjs/toolkit";

import {
  createHotelInfo,
  getHotelById,
  getHotelInfo,
  updateHotelProfile,
} from "./thunk";

const initialState = {
  isLoading: true,
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
    // HotelFacilities: {},
    hotel: {},
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

    // get
    builder.addCase(getHotelInfo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getHotelInfo.fulfilled, (state, action) => {
      console.log("paylod", action.payload);
      state.hotels = action.payload.hotelList;
      state.isLoading = false;
    });
    builder.addCase(getHotelInfo.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    // get Hotel by Id
    builder.addCase(getHotelById.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getHotelById.fulfilled, (state, action) => {
      state.getById.hotel = action.payload.hotelInfo;
      state.getById.isLoading = false;
    });
    builder.addCase(getHotelById.rejected, (state, action) => {
      state.getById.error = action.error;
      state.getById.isLoading = false;
    });
  },
});

export default hotelInfo.reducer;
