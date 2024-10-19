import { createSlice } from "@reduxjs/toolkit";

import {
  createHotelFacilities,
  deleteHotelFacilities,
  getAllHotelFacilities,
  getHotelFacilitiesById,
  updateHotelFacilities,
} from "./thunk";

const initialState = {
  isLoading: false,
  hotelFacilities: [],
  error: null,
  create: {
    isLoading: false,
    error: null,
  },
  getById: {
    isLoading: false,
    error: null,
    HotelFacilities: {},
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

export const hotelFacilities = createSlice({
  name: "hotelFacilities",
  initialState: initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createHotelFacilities.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createHotelFacilities.fulfilled, (state, action) => {
      state.hotelFacilities = action.payload;
      state.create.isLoading = false;
    });
    builder.addCase(createHotelFacilities.rejected, (state, action) => {
      state.create.error = action.error;
      state.create.isLoading = false;
    });

    // get
    builder.addCase(getAllHotelFacilities.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllHotelFacilities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hotelFacilities = action.payload;
    });
    builder.addCase(getAllHotelFacilities.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // get by id
    builder.addCase(getHotelFacilitiesById.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getHotelFacilitiesById.fulfilled, (state, action) => {
      state.getById.HotelFacilities = action.payload;
      state.getById.isLoading = false;
    });
    builder.addCase(getHotelFacilitiesById.rejected, (state, action) => {
      state.getById.error = action.error;
      state.getById.isLoading = false;
    });

    // delete by id
    builder.addCase(deleteHotelFacilities.pending, (state, action) => {
      state.deleteById.isLoading = true;
    });
    builder.addCase(deleteHotelFacilities.fulfilled, (state, action) => {
      state.hotelFacilities = action.payload;
      state.deleteById.isLoading = false;
    });
    builder.addCase(deleteHotelFacilities.rejected, (state, action) => {
      state.deleteById.error = action.error;
      state.deleteById.isLoading = false;
    });

    // update by id
    builder.addCase(updateHotelFacilities.pending, (state, action) => {
      state.updateById.isLoading = true;
    });
    builder.addCase(updateHotelFacilities.fulfilled, (state, action) => {
      state.hotelFacilities = action.payload;
      state.updateById.isLoading = false;
    });
    builder.addCase(updateHotelFacilities.rejected, (state, action) => {
      state.updateById.error = action.error;
      state.updateById.isLoading = false;
    });
  },
});

export default hotelFacilities.reducer;
