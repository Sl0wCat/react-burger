import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { request } from '../../utils';

export const fetchIngredients = createAsyncThunk("fetchIngredients", async () => {
  return await request("ingredients");
})

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    loading: false,
    data: [],
    error: false
  },

  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});
