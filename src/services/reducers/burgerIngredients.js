import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

export const fetchIngredients = createAsyncThunk("fetchIngredients", async () => {
  try {
    const data = await fetch(apiUrl)
      .then(res => {
        if (res.ok) {  
            return res.json();  
        }  
        return Promise.reject(`Ошибка ${res.status}`);  
    });
    return data;
    ;
  } catch (error) {
    console.log(error);
  }
})

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    loading: false,
    data: [],
    error: false
  },

  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  }
});
