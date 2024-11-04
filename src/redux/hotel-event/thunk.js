import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createHotelEvent = createAsyncThunk(
  "createHotelEvent",
  async (data) => {
    const response = await axiosInstance.post(
      endpoints.hotel.event.create,
      data
    );
    return response?.data;
  }
);

export const getAllHotelEvents = createAsyncThunk(
  "getAllHotelEvent",
  async (id) => {
    console.log("id",id);
    const request = await axiosInstance.get(endpoints.hotel.event.getAll(id));
    return request?.data.hotelEvents;
  }
);

export const getHotelEventById = createAsyncThunk(
  "getHotelEvents",
  async (id) => {
    const response = await axiosInstance.get(endpoints.hotel.event.getById(id));
    return response?.data?.hotelEvent;
  }
);

export const updateHotelEventById = createAsyncThunk(
  "updateHotelEventById",
  async ({ id, data }) => {
    const request = await axiosInstance.put(
      endpoints.hotel.event.updateById(id),
      data
    );
    return request?.data;
  }
);

export const deleteEventById = createAsyncThunk(
  "deleteEventById",
  async (id) => {
    const request = await axiosInstance.delete(
      endpoints.hotel.event.deleteById(id)
    );
    return request?.data;
  }
);
