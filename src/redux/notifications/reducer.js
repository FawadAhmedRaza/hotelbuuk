import { createSlice } from "@reduxjs/toolkit";

import { getAllEvents, getAllNotifications, getEventById } from "./thunk";

const initialState = {
  isLoading: false,
  notifications: [],
  error: null,
  getById: {
    isLoading: true,
    error: null,
    event: {},
  },
};

// ---------------------------------------------------------

const notifications = createSlice({
  name: "notifications",
  initialState: initialState,
  extraReducers: (builder) => {
    // get all Events
    builder.addCase(getAllNotifications.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllNotifications.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default notifications.reducer;
