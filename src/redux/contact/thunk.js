import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/src/utils/axios";

export const createContact = createAsyncThunk("createContact", async (data) => {
  const request = await axiosInstance.post(endpoints.contact, data);
  console.log("room thunk", request.data);
  return request?.data;
});