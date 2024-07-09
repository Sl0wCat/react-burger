import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { request } from '../../utils';
import { TIngredient } from '../../utils/types';

export const fetchIngredients = createAsyncThunk("fetchIngredients", async () => {
  return await request("ingredients");
})

interface IBurgerIngredients {
  loading: boolean;
  data: Array<TIngredient>;
  error: boolean;
  dataObject: {
    [_id: string]: TIngredient
  };
}

export const initialState: IBurgerIngredients = {
  loading: false,
  data: [],
  error: false,
  dataObject: {},
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      
      state.dataObject = action.payload.data.reduce(function(res: Object, ingredient: TIngredient) {
        return {
          ...res,
          [ingredient._id]: ingredient
        }
      }, {});
      
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});
