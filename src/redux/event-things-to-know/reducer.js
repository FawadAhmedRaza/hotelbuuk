import { createSlice } from "@reduxjs/toolkit";
import {
  createCancellationPolicy,
  createEventRules,
  createSafetyAndProperty,
  getAllCancellationPolicy,
  getAllEventRules,
  getAllEventSafetyAndProperty,
} from "./thunk";

const initialState = {
  eventRules: {
    isLoading: false,
    error: null,
    rules: [],
    createLoading: false,
  },
  safety: {
    isLoading: false,
    error: null,
    safetyArr: [],
    createLoading: false,
  },
  policy: {
    isLoading: false,
    error: null,
    policyArr: [],
    createLoading: false,
  },
};

// ---------------------------------------------------------

const eventThings = createSlice({
  name: "eventThings",
  initialState: initialState,
  extraReducers: (builder) => {
    // rules
    builder.addCase(createEventRules.pending, (state, action) => {
      state.eventRules.createLoading = true;
    });
    builder.addCase(createEventRules.fulfilled, (state, action) => {
      state.eventRules.rules = action.payload;
      state.eventRules.createLoading = false;
    });
    builder.addCase(createEventRules.rejected, (state, action) => {
      state.eventRules.error = action.error;
      state.eventRules.createLoading = false;
    });

    builder.addCase(getAllEventRules.pending, (state, action) => {
      state.eventRules.isLoading = true;
    });
    builder.addCase(getAllEventRules.fulfilled, (state, action) => {
      state.eventRules.rules = action.payload;
      state.eventRules.isLoading = false;
    });
    builder.addCase(getAllEventRules.rejected, (state, action) => {
      state.eventRules.error = action.error;
      state.eventRules.isLoading = false;
    });

    // safety and property
    builder.addCase(createSafetyAndProperty.pending, (state, action) => {
      state.safety.createLoading = true;
    });
    builder.addCase(createSafetyAndProperty.fulfilled, (state, action) => {
      state.safety.safetyArr = action.payload;
      state.safety.createLoading = false;
    });
    builder.addCase(createSafetyAndProperty.rejected, (state, action) => {
      state.safety.error = action.error;
      state.safety.createLoading = false;
    });

    builder.addCase(getAllEventSafetyAndProperty.pending, (state, action) => {
      state.safety.isLoading = true;
    });
    builder.addCase(getAllEventSafetyAndProperty.fulfilled, (state, action) => {
      state.safety.safetyArr = action.payload;
      state.safety.isLoading = false;
    });
    builder.addCase(getAllEventSafetyAndProperty.rejected, (state, action) => {
      state.safety.error = action.error;
      state.safety.isLoading = false;
    });

    // cancellation policy
    builder.addCase(createCancellationPolicy.pending, (state, action) => {
      state.policy.createLoading = true;
    });
    builder.addCase(createCancellationPolicy.fulfilled, (state, action) => {
      state.policy.policyArr = action.payload;
      state.policy.createLoading = false;
    });
    builder.addCase(createCancellationPolicy.rejected, (state, action) => {
      state.policy.error = action.error;
      state.policy.createLoading = false;
    });

    builder.addCase(getAllCancellationPolicy.pending, (state, action) => {
      state.policy.isLoading = true;
    });
    builder.addCase(getAllCancellationPolicy.fulfilled, (state, action) => {
      state.policy.policyArr = action.payload;
      state.policy.isLoading = false;
    });
    builder.addCase(getAllCancellationPolicy.rejected, (state, action) => {
      state.policy.error = action.error;
      state.policy.isLoading = false;
    });
  },
});

export default eventThings.reducer;
