import { createSlice } from "@reduxjs/toolkit";
import { createAmenities, getAllAmenities } from "./thunk";

const initialState = {
  isLoading: false,
  amenities: [],
  error: null,
  create: {
    isLoading: false,
    error: null,
  },
};

// ---------------------------------------------------------

export const amenities = createSlice({
  name: "amenities",
  initialState: initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createAmenities.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createAmenities.fulfilled, (state, action) => {
      state.amenities = action.payload;
      state.create.isLoading = false;
    });
    builder.addCase(createAmenities.rejected, (state, action) => {
      state.create.error = action.error;
      state.create.isLoading = false;
    });

    // get
    builder.addCase(getAllAmenities.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAmenities.fulfilled, (state, action) => {
      state.amenities = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllAmenities.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default amenities.reducer;
