import { createSlice } from "@reduxjs/toolkit";

import { getAllEvents, getEventById } from "./thunk";

const initialState = {
  isLoading: false,
  events: [],
  error: null,
  getById: {
    isLoading: true,
    error: null,
    event: {},
  },
};

// ---------------------------------------------------------

const allEvents = createSlice({
  name: "allEvents",
  initialState: initialState,
  extraReducers: (builder) => {
    // get all Events
    builder.addCase(getAllEvents.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.events = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllEvents.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    // get event by id
    builder.addCase(getEventById.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getEventById.fulfilled, (state, action) => {
      state.getById.event = action.payload;
      state.getById.isLoading = false;
    });
    builder.addCase(getEventById.rejected, (state, action) => {
      state.getById.error = action.error;
      state.getById.isLoading = false;
    });
  },
});

export default allEvents.reducer;
