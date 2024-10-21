import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createHotelInfo = createAsyncThunk(
  "createHotelInfo",
  async (data) => {
    const response = await axiosInstance.post(endpoints.hotel.create, data);
    return response?.data;
  }
);

export const getHotelInfo = createAsyncThunk("getHotelInfo", async () => {
  const response = await axiosInstance.get(endpoints.hotel.root);
  return response?.data;
});

export const getHotelById = createAsyncThunk("getHotelById", async (id) => {
  const request = await axiosInstance.get(endpoints.hotel.getHotel(id));
  return request?.data;
});

export const updateHotelProfile = createAsyncThunk(
  "updateHotelProfile",
  async ({ id, data }) => {
    const request = await axiosInstance.post(
      endpoints.hotel.updateHotel(id),
      data
    );
    return request?.data;
  }
);
