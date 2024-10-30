import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/src/utils/axios";

export const getAllNomadEvents = createAsyncThunk(
  "getAllNomadEvents",
  async (id) => {
    const request = await axiosInstance.get(
      endpoints.nomad.event.getEvents(id)
    );
    console.log("room thunk", request.data);
    return request?.data?.nomadEvents;
  }
);

export const getEventById = createAsyncThunk("getEventById", async (id) => {
  const request = await axiosInstance.get(endpoints.nomad.event.getById(id));
  console.log("room thunk", request.data);
  return request?.data?.nomadEvent;
});

export const deleteEvent = createAsyncThunk("deleteEvent", async (id) => {
  console.log("ID from thunk", id);

  const request = await axiosInstance.delete(
    endpoints.nomad.event.delete_by_id(id)
  );
  console.log("room thunk", request.data);
  return request?.data;
});
