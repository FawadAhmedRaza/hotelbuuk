import { createSlice } from "@reduxjs/toolkit";
import {
  createWishList,
  deleteWishList,
  getWishById,
  getWishList,
} from "./thunk";

const initialState = {
  isLoading: false,
  wishList: [],
  error: null,
  create: {
    isLoading: false,
    error: null,
  },
  getById: {
    isLoading: false,
    error: null,
    wish: {},
  },
  deleteWish: {
    isLoading: false,
    error: null,
  },
};

// ---------------------------------------------------------

const wishList = createSlice({
  name: "wishList",
  initialState: initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createWishList.pending, (state, action) => {
      state.create.isLoading = true;
    });
    builder.addCase(createWishList.fulfilled, (state, action) => {
      state.wishList = action.payload;
      state.create.isLoading = false;
    });
    builder.addCase(createWishList.rejected, (state, action) => {
      state.create.error = action.error;
      state.create.isLoading = false;
    });

    // get
    builder.addCase(getWishList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getWishList.fulfilled, (state, action) => {
      state.wishList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getWishList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // get wish by id
    builder.addCase(getWishById.pending, (state, action) => {
      state.getById.isLoading = true;
    });
    builder.addCase(getWishById.fulfilled, (state, action) => {
      state.getById.wish = action.payload;
      state.getById.isLoading = false;
    });
    builder.addCase(getWishById.rejected, (state, action) => {
      state.getById.isLoading = false;
      state.getById.error = action.error;
    });

    // delete wish by id
    builder.addCase(deleteWishList.pending, (state, action) => {
      state.deleteWish.isLoading = true;
    });
    builder.addCase(deleteWishList.fulfilled, (state, action) => {
      state.deleteWish.isLoading = false;
    });
    builder.addCase(deleteWishList.rejected, (state, action) => {
      state.deleteWish.isLoading = false;
      state.deleteWish.error = action.error;
    });
  },
});

export default wishList.reducer;
