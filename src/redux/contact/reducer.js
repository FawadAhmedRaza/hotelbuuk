import { createSlice } from "@reduxjs/toolkit";
import { createContact, createRoom } from "./thunk";

const initialState = {
  isLoading: false,
  contacts: [],
  error: null,
  create: {
    isLoading: false,
    error: null,
  },
  getAllContacts: {
    isLoading: false,
    error: null,
    contacts: [],
  },
};

// ---------------------------------------------------------

export const hotelRooms = createSlice({
  name: "hotelRooms",
  initialState: initialState,
  extraReducers: (builder) => {
    // create room
    builder.addCase(createContact.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state, action) => {
      state.create.isLoading = false;
    });
    builder.addCase(createContact.rejected, (state, action) => {
      state.create.isLoading = false;
      state.create.error = action.error;
    });
  },
});

export default hotelRooms.reducer;
