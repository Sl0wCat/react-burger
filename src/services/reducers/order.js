import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = "https://norma.nomoreparties.space/api/orders";

export const fetchOrder = createAsyncThunk("fetchOrder", async (params) => {
  try {
    const data = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      })
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

const initialState = {
    loading: false,
    order: {},
    error: false
}

export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        cleanOrder: (state) => {
            state.order = initialState.order
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload.order;
        });
        builder.addCase(fetchOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const { cleanOrder } = orderSlice.actions