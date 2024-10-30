import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getGuestProfile = createAsyncThunk(
  "getGuestProfile",
  async (id) => {
    const request = await axiosInstance.get(endpoints.guest.get_profile(id));
    console.log("Reqeuest",request?.data);
    return request?.data;
  }
);