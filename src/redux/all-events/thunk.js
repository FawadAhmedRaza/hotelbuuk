import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/src/utils/axios";

export const getAllEvents = createAsyncThunk("getAllEvents", async () => {
  const request = await axiosInstance.get(endpoints.events.root);
  return request?.data?.Events;
});

export const getEventById = createAsyncThunk(
  "getEventById",
  async ({ id, type }) => {
    const request = await axiosInstance.get(endpoints.events.getById(id, type));
    return request?.data.event;
  }
);
