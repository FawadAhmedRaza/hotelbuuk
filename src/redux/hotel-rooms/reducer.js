import { createSlice } from "@reduxjs/toolkit";
import { createRoom, createRoomTypes, getAllRoomTypes } from "./thunk";

const initialState = {
  isLoading: false,
  roomTypes: [],
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
  createRoom: {
    isLoading: false,
    error: null,
  },
};

// ---------------------------------------------------------

export const hotelRooms = createSlice({
  name: "hotelRooms",
  initialState: initialState,
  extraReducers: (builder) => {
    // create room types
    builder.addCase(createRoomTypes.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createRoomTypes.fulfilled, (state, action) => {
      state.roomTypes = action.payload;
      state.create.isLoading = false;
    });
    builder.addCase(createRoomTypes.rejected, (state, action) => {
      state.create.error = action.error;
      state.create.isLoading = false;
    });

    // get room types
    builder.addCase(getAllRoomTypes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRoomTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomTypes = action.payload;
    });
    builder.addCase(getAllRoomTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // create room
    builder.addCase(createRoom.pending, (state, action) => {
      state.createRoom.isLoading = true;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.createRoom.isLoading = false;
      // state.createRoom = action.payload;
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.createRoom.isLoading = false;
      state.createRoom.error = action.error;
    });
  },
});

export default hotelRooms.reducer;
