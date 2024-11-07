import axiosInstance, { endpoints } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import { create, deleteById, getAll, getById, updateById } from "@/apis/hotel-facilities";

export const createWishList = createAsyncThunk(
  "createWishList",
  async (data) => {
    const request = await axiosInstance.post(endpoints.wishlist.root, data);
    return request?.data;
  }
);

export const getWishList = createAsyncThunk("getWishList", async (id) => {
  const request = await axiosInstance.get(
    endpoints.wishlist.getAllWishList(id)
  );
  return request?.data?.wishList;
});

export const getWishById = createAsyncThunk(
  "getWishById",
  async ({ userId, eventId }) => {
    // Use an object as the argument
    const request = await axiosInstance.get(
      endpoints.wishlist.getWishById(userId, eventId)
    );
    return request?.data?.wishList;
  }
);

export const deleteWishList = createAsyncThunk(
  "deleteWishList",
  async ({ userId, eventId }, { rejectWithValue }) => {
    try {
      // Make a DELETE request to your API endpoint to remove the item from the wishlist
      const response = await axiosInstance.delete(
        endpoints.wishlist.deleteWish(userId, eventId)
      );
      return response?.data?.message; // Return any success message if available
    } catch (error) {
      // Handle errors and use rejectWithValue to pass the error to the reducer
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete wishlist item"
      );
    }
  }
);
