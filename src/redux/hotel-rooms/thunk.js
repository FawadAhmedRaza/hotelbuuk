import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/src/utils/axios";

export const createRoomTypes = createAsyncThunk(
  "createRoomTypes",
  async (data) => {
    const request = await axiosInstance.post(
      endpoints.hotel.roomTypes.create,
      data
    );
    return request?.data?.types;
  }
);

export const getAllRoomTypes = createAsyncThunk(
  "getAllRoomTypes",
  async (id) => {
    const request = await axiosInstance.get(
      endpoints.hotel.roomTypes.get_all(id)
    );
    return request?.data?.types;
  }
);

export const getRooms = createAsyncThunk("getRooms", async (id) => {
  const request = await axiosInstance.get(
    endpoints.hotel.rooms.get_all_rooms(id)
  );
  return request?.data?.hotelRooms;
});

export const getRoomById = createAsyncThunk("getRoomById", async (id) => {
  const request = await axiosInstance.get(endpoints.hotel.rooms.get_by_id(id));
  return request?.data?.room;
});

export const updateRoom = createAsyncThunk(
  "updateRoom",
  async ({ id, data }) => {

    const request = await axiosInstance.put(
      endpoints.hotel.rooms.get_by_id(id),
      data
    );
    return request?.data?.room;
  }
);

export const deleteRoom = createAsyncThunk("deleteRoom", async (id) => {

  const request = await axiosInstance.delete(
    endpoints.hotel.rooms.delete_room(id) // Only pass the URL
  );
  return request?.data; // Assuming this is where the deleted room info is returned
});

export const createRoom = createAsyncThunk("createRoom", async (data) => {
  const request = await axiosInstance.post(endpoints.hotel.rooms.create, data);
  return request?.data;
});
