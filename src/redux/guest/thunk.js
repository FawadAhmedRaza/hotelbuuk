import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getGuestProfile = createAsyncThunk(
  "getGuestProfile",
  async (id) => {
    const request = await axiosInstance.get(endpoints.guest.get_profile(id));
    return request?.data;
  }
);