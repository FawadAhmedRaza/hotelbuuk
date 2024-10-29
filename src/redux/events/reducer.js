import { createSlice } from "@reduxjs/toolkit";

import { deleteEvent, getAllNomadEvents, getEventById } from "./thunk";

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

const nomadEvents = createSlice({
  name: "nomadEvents",
  initialState: initialState,
  extraReducers: (builder) => {
    // get all nomad Events
    builder.addCase(getAllNomadEvents.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNomadEvents.fulfilled, (state, action) => {
      console.log("paylod", action.payload);
      state.events = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllNomadEvents.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    // get nomad Event by id
    builder.addCase(getEventById.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getEventById.fulfilled, (state, action) => {
      console.log("paylod", action.payload);
      state.getById.event = action.payload;
      state.getById.isLoading = false;
    });
    builder.addCase(getEventById.rejected, (state, action) => {
      state.getById.error = action.error;
      state.getById.isLoading = false;
    });

    // Delete nomad Event
    builder.addCase(deleteEvent.pending, (state, action) => {
      state.deleteById.isLoading = true;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.deleteById.event = action.payload;
      state.deleteById.isLoading = false;
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.deleteById.error = action.error;
      state.deleteById.isLoading = false;
    });
  },
});

export default nomadEvents.reducer;
