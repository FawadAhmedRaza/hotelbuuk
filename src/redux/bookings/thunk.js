import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBookings = createAsyncThunk(
  "getAllBookings",
  async ({ id, type }) => {
    const request = await axiosInstance.get(
      endpoints.booking.get_all_bookings(id, type)
    );
    return request?.data?.bookings;
  }
);

export const updateBookingStatus = createAsyncThunk(
  "updateAcceptedBooking",
  async ({ id, data }) => {
    const request = await axiosInstance.post(
      endpoints.booking.update_accepted_booking(id),
      data
    );
    return request?.data?.bookings;
  }
);

export const getGuestBookingsList = createAsyncThunk(
  "getGuestBookingsList",
  async (id) => {
    const request = await axiosInstance.get(
      endpoints.guest.bookings.get_all(id)
    );
    return request?.data?.bookings;
  }
);

export const getRecentBookings = createAsyncThunk(
  "getRecentBookings",
  async ({ id, type }) => {
    const request = await axiosInstance.get(
      endpoints.booking.get_recent_bookings(id, type)
    );
    return request?.data?.recentBookings;
  }
);
export const getUserBooking = createAsyncThunk(
  "getUserBooking",
  async ({ userId,eventId, type }) => {
    const request = await axiosInstance.get(
      endpoints.booking.get_user_booking(userId,eventId, type)
    );
    return request?.data?.booking;
  }
);
