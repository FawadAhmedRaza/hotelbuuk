import { createSlice } from "@reduxjs/toolkit";
import {
  createRoom,
  createRoomTypes,
  getRooms,
  getAllRoomTypes,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "./thunk";

const initialState = {
  isLoading: false,
  roomTypes: [],
  error: null,
  create: {
    isLoading: false,
    error: null,
  },
  getAllRooms: {
    isLoading: false,
    error: null,
    rooms: [],
  },
  getById: {
    isLoading: false,
    error: null,
    HotelFacilities: {},
    room: {},
  },
  deleteById: {
    isLoading: false,
    error: null,
    room: {},
  },
  updateById: {
    isLoading: false,
    error: null,
    room: {},
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

    // get all rooms
    builder.addCase(getRooms.pending, (state, action) => {
      state.getAllRooms.isLoading = true;
    });
    builder.addCase(getRooms.fulfilled, (state, action) => {
      console.log("Fetched Rooms: ", action.payload); // Verify payload
      state.getAllRooms.rooms = action.payload; // Store rooms correctly
      state.getAllRooms.isLoading = false;
    });
    builder.addCase(getRooms.rejected, (state, action) => {
      state.getAllRooms.isLoading = false;
      state.getAllRooms.error = action.error;
    });

    // get room by id
    builder.addCase(getRoomById.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getRoomById.fulfilled, (state, action) => {
      console.log("Get Room: ", action.payload); // Verify payload
      state.getById.room = action.payload; // Store rooms correctly
      state.getById.isLoading = false;
    });
    builder.addCase(getRoomById.rejected, (state, action) => {
      state.getById.isLoading = false;
      state.getById.error = action.error;
    });

    // update room
    builder.addCase(updateRoom.pending, (state, action) => {
      state.updateById.isLoading = true;
    });
    builder.addCase(updateRoom.fulfilled, (state, action) => {
      console.log("Updated room: ", action.payload);
      state.updateById.room = action.payload;
      state.updateById.isLoading = false;
    });
    builder.addCase(updateRoom.rejected, (state, action) => {
      state.updateById.isLoading = false;
      state.updateById.error = action.error;
    });

    // delete room
    builder.addCase(deleteRoom.pending, (state, action) => {
      state.deleteById.isLoading = true;
    });
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      console.log("deleted room", action.payload);
      state.deleteById.room = action.payload;
      state.deleteById.isLoading = false;
    });
    builder.addCase(deleteRoom.rejected, (state, action) => {
      state.deleteById.isLoading = false;
      state.deleteById.error = action.error;
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
