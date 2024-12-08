import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/src/utils/axios";

export const getAllNotifications = createAsyncThunk(
  "getAllNotifications",
  async (id) => {
    const request = await axiosInstance.get(endpoints.notifications(id));
    return request?.data?.list;
  }
);
