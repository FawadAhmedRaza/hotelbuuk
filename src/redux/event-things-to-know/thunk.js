import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createEventRules = createAsyncThunk(
  "createEventRules",
  async (data) => {
    const request = await axiosInstance.post(
      endpoints.events.rules.create,
      data
    );
    return request?.data?.rules;
  }
);

export const getAllEventRules = createAsyncThunk(
  "getAllEventRules",
  async (id) => {
    const request = await axiosInstance.get(endpoints.events.rules.getAll(id));
    return request?.data?.rules;
  }
);

export const createSafetyAndProperty = createAsyncThunk(
  "createSafetyAndProperty",
  async (data) => {
    const request = await axiosInstance.post(
      endpoints.events.safety.create,
      data
    );
    return request?.data?.safety;
  }
);

export const getAllEventSafetyAndProperty = createAsyncThunk(
  "getAllEventSafetyAndProperty",
  async (id) => {
    const request = await axiosInstance.get(endpoints.events.safety.getAll(id));
    return request?.data?.safety;
  }
);

export const createCancellationPolicy = createAsyncThunk(
  "createCancellationPolicy",
  async (data) => {
    const request = await axiosInstance.post(
      endpoints.events.policy.create,
      data
    );
    return request?.data?.policy;
  }
);

export const getAllCancellationPolicy = createAsyncThunk(
  "getAllCancellationPolicy",
  async (id) => {
    const request = await axiosInstance.get(endpoints.events.policy.getAll(id));
    return request?.data?.policy;
  }
);
