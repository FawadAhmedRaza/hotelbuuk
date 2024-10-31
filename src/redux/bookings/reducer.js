import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBookings,
  getGuestBookingsList,
  updateBookingStatus,
  getRecentBookings,
} from "./thunk";

const initialState = {
  isLoading: false,
  allBookings: [],
  guestBookings: [],
  recentBookingsList: [],
  error: null,
  getById: {
    isLoading: false,
    error: null,
    guest: {},
  },
  updateStatus: {
    isLoading: false,
    error: null,
  },
  getGuestBookings: {
    isLoading: false,
    error: null,
  },
  recentBookings: {
    isLoading: false,
    error: null,
  },
  rejectBooking: {
    isLoading: false,
    error: null,
  },
};

// ---------------------------------------------------------

export const bookings = createSlice({
  name: "bookings",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllBookings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.allBookings = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllBookings.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    // accept
    builder.addCase(updateBookingStatus.pending, (state, action) => {
      state.updateStatus.isLoading = true;
    });
    builder.addCase(updateBookingStatus.fulfilled, (state, action) => {
      state.allBookings = action.payload;
      state.updateStatus.isLoading = false;
    });
    builder.addCase(updateBookingStatus.rejected, (state, action) => {
      state.updateStatus.error = action.error;
      state.updateStatus.isLoading = false;
    });

    // guest bookings
    builder.addCase(getGuestBookingsList.pending, (state, action) => {
      state.getGuestBookings.isLoading = true;
    });
    builder.addCase(getGuestBookingsList.fulfilled, (state, action) => {
      state.guestBookings = action.payload;
      state.getGuestBookings.isLoading = false;
    });
    builder.addCase(getGuestBookingsList.rejected, (state, action) => {
      state.getGuestBookings.error = action.error;
      state.getGuestBookings.isLoading = false;
    });

    // get recent bookings
    builder.addCase(getRecentBookings.pending, (state, action) => {
      state.recentBookings.isLoading = true;
    });
    builder.addCase(getRecentBookings.fulfilled, (state, action) => {
      state.recentBookingsList = action.payload;
      state.recentBookings.isLoading = false;
    });
    builder.addCase(getRecentBookings.rejected, (state, action) => {
      state.recentBookings.error = action.error;
      state.recentBookings.isLoading = false;
    });
  },
});

export default bookings.reducer;
