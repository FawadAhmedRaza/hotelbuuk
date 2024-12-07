import { createSlice } from "@reduxjs/toolkit";

import {
  createNomadProfile,
  deleteNomadProfile,
  getAvailableNomads,
  getInternalNomad,
  getNomadProfileById,
  getNomadsProfile,
  getSingleNomad,
  updateNomadProfile,
} from "./thunk";

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
    nomad: {},
  },
  getNomad: {
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
  allInternalNomads: {
    isLoading: false,
    error: null,
    internalNomads: [],
  },
  availableNomads: {
    isLoading: false,
    error: null,
    nomads: [],
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
      state.nomads = action.payload.nomads;
      state.isLoading = false;
    });
    builder.addCase(getNomadsProfile.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    // Get available Nomads
    builder.addCase(getAvailableNomads.pending, (state, action) => {
      state.availableNomads.isLoading = true;
    });
    builder.addCase(getAvailableNomads.fulfilled, (state, action) => {
      state.availableNomads.nomads = action.payload.nomads;
      state.availableNomads.isLoading = false;
    });
    builder.addCase(getAvailableNomads.rejected, (state, action) => {
      state.availableNomads.error = action.error;
      state.availableNomads.isLoading = false;
    });

    // get nomads by Id
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

    // get Single Nomad
    builder.addCase(getSingleNomad.pending, (state, action) => {
      state.getNomad.isLoading = true;
    });
    builder.addCase(getSingleNomad.fulfilled, (state, action) => {
      state.getNomad.nomad = action.payload.nomad;
      state.getNomad.isLoading = false;
    });
    builder.addCase(getSingleNomad.rejected, (state, action) => {
      state.getNomad.error = action.error;
      state.getNomad.isLoading = false;
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

    // Get Internal Nomads
    builder.addCase(getInternalNomad.pending, (state, action) => {
      state.allInternalNomads.isLoading = true;
    });
    builder.addCase(getInternalNomad.fulfilled, (state, action) => {
      state.allInternalNomads.internalNomads = action.payload.internalNomads;
      state.allInternalNomads.isLoading = false;
    });
    builder.addCase(getInternalNomad.rejected, (state, action) => {
      state.allInternalNomads.error = action.error;
      state.allInternalNomads.isLoading = false;
    });

    // Get Internal Nomads
    builder.addCase(deleteNomadProfile.pending, (state, action) => {
      state.deleteById.isLoading = true;
    });
    builder.addCase(deleteNomadProfile.fulfilled, (state, action) => {
      state.deleteById.isLoading = false;
    });
    builder.addCase(deleteNomadProfile.rejected, (state, action) => {
      state.deleteById.error = action.error;
      state.deleteById.isLoading = false;
    });
  },
});

export default nomadProfile.reducer;
