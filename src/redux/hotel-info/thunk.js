import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createHotelInfo = createAsyncThunk(
  "createHotelInfo",
  async (data) => {
    const response = await axiosInstance.post(endpoints.hotel.create, data);
    return response?.data;
  }
);
