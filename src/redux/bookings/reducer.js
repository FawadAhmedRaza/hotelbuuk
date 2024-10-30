import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBookings,
  updateBookingStatus,
} from "./thunk";

const initialState = {
  isLoading: false,
  allBookings: [],
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
  },
});

export default bookings.reducer;
