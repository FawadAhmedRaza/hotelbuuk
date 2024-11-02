import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/src/utils/axios";

export const getAllNomadEvents = createAsyncThunk(
  "getAllNomadEvents",
  async (id) => {
    const request = await axiosInstance.get(
      endpoints.nomad.event.getEvents(id)
    );
    return request?.data?.nomadEvents;
  }
);

export const getEventById = createAsyncThunk("getEventById", async (id) => {
  const request = await axiosInstance.get(endpoints.nomad.event.getById(id));
  return request?.data?.nomadEvent;
});

export const deleteEvent = createAsyncThunk("deleteEvent", async (id) => {
  const request = await axiosInstance.delete(
    endpoints.nomad.event.delete_by_id(id)
  );
  return request?.data;
});

export const getBusinessFacts = createAsyncThunk(
  "getBusinessFacts",
  async () => {
    const request = await axiosInstance.get("/business-facts");
    console.log("request",request?.data);
    return request?.data?.list;
  }
);
