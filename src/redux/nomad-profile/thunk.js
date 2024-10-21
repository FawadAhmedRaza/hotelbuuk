import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createNomadProfile = createAsyncThunk(
  "createNomadProfile",
  async (data) => {
    const request = await axiosInstance.post(endpoints.nomad.create, data);
    return request?.data;
  }
);
