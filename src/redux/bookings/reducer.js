import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBookings,
  getGuestBookingsList,
  updateBookingStatus,
  getRecentBookings,
  getUserBooking,
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
  userBooking: {
    data:{},
    isLoading: true,
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

    // get recent bookings
    builder.addCase(getUserBooking.pending, (state, action) => {
      state.userBooking.isLoading = true;
    });
    builder.addCase(getUserBooking.fulfilled, (state, action) => {
      state.userBooking.data = action.payload;
      state.userBooking.isLoading = false;
    });
    builder.addCase(getUserBooking.rejected, (state, action) => {
      state.userBooking.error = action.error;
      state.userBooking.isLoading = false;
      state.userBooking.data = null;

    });
  },
});

export default bookings.reducer;
