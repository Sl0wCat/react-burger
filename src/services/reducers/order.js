import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '../../utils';

export const fetchOrder = createAsyncThunk("fetchOrder", async (params) => {
    return request("orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
    });
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