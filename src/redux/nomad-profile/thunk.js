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

export const getNomadProfileById = createAsyncThunk(
  "getNomadProfileById",
  async (id) => {
    const request = await axiosInstance.get(endpoints.nomad.getProfile(id));
    return request?.data;
  }
);

export const getSingleNomad = createAsyncThunk("getSingleNomad", async (id) => {
  const request = await axiosInstance.get(endpoints.nomad.getSingleNomad(id));
  return request?.data;
});

export const getAvailableNomads = createAsyncThunk(
  "getAvailableNomads",
  async (id) => {
    const request = await axiosInstance.get(
      endpoints.hotel.availableNomads(id)
    );
    return request?.data;
  }
);

export const getInternalNomad = createAsyncThunk(
  "getInternalNomad",
  async (id) => {
    const request = await axiosInstance.get(endpoints.hotel.internalNomad(id));
    return request?.data;
  }
);

export const updateNomadProfile = createAsyncThunk(
  "updateNomadProfile",
  async ({ id, data }) => {
    const request = await axiosInstance.post(
      endpoints.nomad.updateProfile(id),
      data
    );
    return request?.data;
  }
);

export const deleteNomadProfile = createAsyncThunk(
  "deleteNomadProfie",
  async (id) => {
    const request = await axiosInstance.delete(
      endpoints.nomad.deleteProfile(id)
    );
    return request?.data;
  }
);
