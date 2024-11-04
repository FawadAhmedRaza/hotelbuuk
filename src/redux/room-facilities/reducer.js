import { createSlice } from "@reduxjs/toolkit";

import { createRoomFacilities, getAllRoomFacilities } from "./thunk";

const initialState = {
  isLoading: false,
  roomFacilities: [],
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

export const roomFacilities = createSlice({
  name: "roomFacilities",
  initialState: initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createRoomFacilities.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createRoomFacilities.fulfilled, (state, action) => {
      state.roomFacilities = action.payload;
      state.create.isLoading = false;
    });
    builder.addCase(createRoomFacilities.rejected, (state, action) => {
      state.create.error = action.error;
      state.create.isLoading = false;
    });

    // get
    builder.addCase(getAllRoomFacilities.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRoomFacilities.fulfilled, (state, action) => {
      console.log("All Rooms Facilities", action.payload);
      state.roomFacilities = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllRoomFacilities.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default roomFacilities.reducer;
