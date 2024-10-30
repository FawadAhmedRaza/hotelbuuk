import { createSlice } from "@reduxjs/toolkit";

import { getAllEvents } from "./thunk";

const initialState = {
  isLoading: false,
  events: [],
  error: null,
  create: {
    isLoading: false,
    error: null,
  },
  getById: {
    isLoading: false,
    error: null,
    event: {},
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

const allEvents = createSlice({
  name: "allEvents",
  initialState: initialState,
  extraReducers: (builder) => {
    // get all nomad Events
    builder.addCase(getAllEvents.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      console.log("paylod", action.payload);
      state.events = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllEvents.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default allEvents.reducer;
