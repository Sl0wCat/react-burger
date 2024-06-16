import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { request } from '../../utils';

interface IFetchOrder {
    ingredients: Array<string>
}

interface IOrderItem {
    number: boolean
}

interface IFetchOrderResponse {
    name: string,
    order: IOrderItem,
    success: boolean
}

export const fetchOrder = createAsyncThunk<IFetchOrderResponse, IFetchOrder>(
    "fetchOrder", 
    async (params) => {
        return request("orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params)
        });
    })

interface IOrder {
    loading: boolean,
    order: IOrderItem | null,
    error: boolean
}

const initialState: IOrder = {
    loading: false,
    order: null,
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
        builder.addCase(fetchOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrder.fulfilled, (state, action: PayloadAction<IFetchOrderResponse>) => {
            state.loading = false;
            state.order = action.payload.order;
        });
        builder.addCase(fetchOrder.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const { cleanOrder } = orderSlice.actions