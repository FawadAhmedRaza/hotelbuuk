import { createSlice } from "@reduxjs/toolkit";

import { createNomadProfile, getNomadsProfile } from "./thunk";

const initialState = {
  isLoading: false,
  nomads: [],
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

export const nomadProfile = createSlice({
  name: "nomadProfile",
  initialState: initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createNomadProfile.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createNomadProfile.fulfilled, (state, action) => {
      console.log("paylod", action.payload);
      //   state.hotels = action.payload;
      //   state.create.accessToken = action.payload.accessToken;
      //   state.create.user = action.payload.user;
      state.create.isLoading = false;
    });
    builder.addCase(createNomadProfile.rejected, (state, action) => {
      state.create.error = action.error;
      state.create.isLoading = false;
    });

    // Get
    builder.addCase(getNomadsProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getNomadsProfile.fulfilled, (state, action) => {
      console.log("paylod", action.payload);
      state.nomads = action.payload.nomads;
      // state.create.accessToken = action.payload.accessToken;
      //   state.create.user = action.payload.user;
      // state.create.isLoading = false;
    });
    builder.addCase(getNomadsProfile.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default nomadProfile.reducer;
