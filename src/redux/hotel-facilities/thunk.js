import { createAsyncThunk } from "@reduxjs/toolkit";

// import { create, deleteById, getAll, getById, updateById } from "@/apis/hotel-facilities";

export const createHotelFacilities = createAsyncThunk("createHotelFacilities", async (data) => {
  // const request = await create(data);
  // return request;
});

export const getAllHotelFacilities = createAsyncThunk("getAllHotelFacilities", async () => {
  // const request = await getAll();
  // return request;
});

export const getHotelFacilitiesById = createAsyncThunk("getHotelFacilitiesById", async (id) => {
  // const request = await getById(id);
  // return request;
});

export const deleteHotelFacilities = createAsyncThunk("deleteHotelFacilities", async (id) => {
  // const request = await deleteById(id);
  // return request;
});

export const updateHotelFacilities = createAsyncThunk("updateHotelFacilities", async ({ id, data }) => {
  // const request = await updateById(id, data);
  // return request;
});
