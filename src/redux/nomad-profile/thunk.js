import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createNomadProfile = createAsyncThunk(
  "createNomadProfile",
  async (data) => {
    const request = await axiosInstance.post(endpoints.nomad.create, data);
    return request?.data;
  }
);

export const getNomadsProfile = createAsyncThunk(
  "getNomadsProfile",
  async () => {
    const request = await axiosInstance.get(endpoints.nomad.root);
    return request?.data;
  }
);
