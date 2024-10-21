import { createSlice } from "@reduxjs/toolkit";

import {
  createNomadProfile,
  getNomadProfileById,
  updateNomadProfile,
} from "./thunk";

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
    nomad: {},
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

    // get
    builder.addCase(getNomadProfileById.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getNomadProfileById.fulfilled, (state, action) => {
      state.getById.nomad = action.payload.nomad;
      state.getById.isLoading = false;
    });
    builder.addCase(getNomadProfileById.rejected, (state, action) => {
      state.getById.error = action.error;
      state.getById.isLoading = false;
    });

    // update
    builder.addCase(updateNomadProfile.pending, (state, action) => {
      state.updateById.isLoading = true;
    });
    builder.addCase(updateNomadProfile.fulfilled, (state, action) => {
      state.updateById.isLoading = false;
    });
    builder.addCase(updateNomadProfile.rejected, (state, action) => {
      state.updateById.error = action.error;
      state.updateById.isLoading = false;
    });
  },
});

export default nomadProfile.reducer;
