import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import { create, deleteById, getAll, getById, updateById } from "@/apis/hotel-facilities";

export const createAmenities = createAsyncThunk(
  "createAmenities",
  async (data) => {
    const request = await axiosInstance.post(
      endpoints.nomad.amenities.create,
      data
    );
    return request?.data?.amenities;
  }
);

export const getAllAmenities = createAsyncThunk(
  "getAllAmenities",
  async (id) => {
    const request = await axiosInstance.get(
      endpoints.nomad.amenities.getAll(id)
    );
    return request?.data?.amenities;
  }
);
