import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/src/utils/axios";

export const createRoomTypes = createAsyncThunk(
  "createRoomTypes",
  async (data) => {
    const request = await axiosInstance.post(
      endpoints.hotel.roomTypes.create,
      data
    );
    return request?.data?.types;
  }
);

export const getAllRoomTypes = createAsyncThunk(
  "getAllRoomTypes",
  async (id) => {
    const request = await axiosInstance.get(
      endpoints.hotel.roomTypes.get_all(id)
    );
    return request?.data?.types;
  }
);

export const createRoom = createAsyncThunk("createRoom", async (data) => {
  const request = await axiosInstance.post(endpoints.hotel.rooms.create, data);
  return request?.data;
});
