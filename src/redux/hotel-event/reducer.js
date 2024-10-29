import { createSlice } from "@reduxjs/toolkit";

import {
  createHotelEvent,
  deleteEventById,
  getAllHotelEvents,
  getHotelEventById,
  updateHotelEventById,
} from "./thunk";

const initialState = {
  isLoading: false,
  hotelEvents: [],
  error: null,
  create: {
    isLoading: false,
    error: null,
  },
  getById: {
    isLoading: false,
    error: null,
    hotelEvent: {},
  },
  deleteById: {
    isLoading: false,
    error: null,
  },
  updateById: {
    isLoading: false,
    error: null,
  },
};

// ---------------------------------------------------------

export const hotelEvent = createSlice({
  name: "hotelEvent",
  initialState: initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createHotelEvent.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createHotelEvent.fulfilled, (state, action) => {
      state.hotelEvents = action.payload;
      state.create.isLoading = false;
    });
    builder.addCase(createHotelEvent.rejected, (state, action) => {
      state.create.error = action.error?.message;
      state.create.isLoading = false;
    });

    // get all
    builder.addCase(getAllHotelEvents.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllHotelEvents.fulfilled, (state, action) => {
      state.hotelEvents = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllHotelEvents.rejected, (state, action) => {
      state.error = action.error?.message;
      state.isLoading = false;
    });

    // get by id
    builder.addCase(getHotelEventById.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getHotelEventById.fulfilled, (state, action) => {
      state.getById.hotelEvent = action.payload;
      state.getById.isLoading = false;
    });
    builder.addCase(getHotelEventById.rejected, (state, action) => {
      state.getById.error = action.error?.message;
      state.getById.isLoading = false;
    });

    // update by id
    builder.addCase(updateHotelEventById.pending, (state, action) => {
      state.updateById.isLoading = true;
    });
    builder.addCase(updateHotelEventById.fulfilled, (state, action) => {
      state.updateById.isLoading = false;
    });
    builder.addCase(updateHotelEventById.rejected, (state, action) => {
      state.updateById.error = action.error?.message;
      state.updateById.isLoading = false;
    });

    // delete by id
    builder.addCase(deleteEventById.pending, (state, action) => {
      state.deleteById.isLoading = true;
    });
    builder.addCase(deleteEventById.fulfilled, (state, action) => {
      state.deleteById.isLoading = false;
    });
    builder.addCase(deleteEventById.rejected, (state, action) => {
      state.deleteById.error = action.error?.message;
      state.deleteById.isLoading = false;
    });
  },
});

export default hotelEvent.reducer;
