import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import { create, deleteById, getAll, getById, updateById } from "@/apis/hotel-facilities";

export const createHotelFacilities = createAsyncThunk(
  "createHotelFacilities",
  async (data) => {
    const request = await axiosInstance.post(
      endpoints.hotel.facilites.create,
      data
    );
    return request?.data?.facilites;
  }
);

export const getAllHotelFacilities = createAsyncThunk(
  "getAllHotelFacilities",
  async (id) => {
    const request = await axiosInstance.get(
      endpoints.hotel.facilites.get_all(id)
    );
    return request?.data?.facilities;
  }
);

export const getHotelFacilitiesById = createAsyncThunk(
  "getHotelFacilitiesById",
  async (id) => {
    // const request = await getById(id);
    // return request;
  }
);

export const deleteHotelFacilities = createAsyncThunk(
  "deleteHotelFacilities",
  async (id) => {
    // const request = await deleteById(id);
    // return request;
  }
);

export const updateHotelFacilities = createAsyncThunk(
  "updateHotelFacilities",
  async ({ id, data }) => {
    // const request = await updateById(id, data);
    // return request;
  }
);
