import { createSlice } from "@reduxjs/toolkit";
import { getGuestProfile } from "./thunk";

const initialState = {
  isLoading: false,
  allGuest: [],
  error: null,
  getById: {
    isLoading: false,
    error: null,
    guest: {},
  },
  updateById: {
    isLoading: false,
    error: null,
  },
};

// ---------------------------------------------------------

export const guest = createSlice({
  name: "guest",
  initialState: initialState,
  extraReducers: (builder) => {
    // get Hotel by Id
    builder.addCase(getGuestProfile.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getGuestProfile.fulfilled, (state, action) => {
      state.getById.guest = action.payload.guest;
      state.getById.isLoading = false;
    });
    builder.addCase(getGuestProfile.rejected, (state, action) => {
      state.getById.error = action.error;
      state.getById.isLoading = false;
    });
  },
});

export default guest.reducer;
