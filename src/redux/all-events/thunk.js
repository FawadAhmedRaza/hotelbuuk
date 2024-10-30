import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/src/utils/axios";

export const getAllEvents = createAsyncThunk("getAllEvents", async (id) => {
  const request = await axiosInstance.get(endpoints.events.root);
  console.log("room thunk", request.data);
  return request?.data?.Events;
});
