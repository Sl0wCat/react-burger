import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { request } from '../../utils';

import { IOrder as IOrderInfo } from '../../utils/types';

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
        const token = localStorage.getItem('accessToken');
        return request("orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token
            },
            body: JSON.stringify(params)
        });
    })

interface IFetchOrderInfoResponse {
    name: string,
    orders: Array<IOrderInfo>,
    success: boolean
}

export const fetchOrderInfo = createAsyncThunk<IFetchOrderInfoResponse, number>(
    'fetchOrderInfo', 
    async (id) => {
        return request(`orders/${id}`);
    })

interface IOrder {
    loading: boolean,
    order: IOrderItem | null,
    error: boolean,
    orderInfo?: IOrderInfo,
    orderInfoFetching: boolean,
    orderInfoError: boolean,
}

const initialState: IOrder = {
    loading: false,
    order: null,
    error: false,
    orderInfoFetching: false,
    orderInfoError: false,
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
        builder.addCase(fetchOrderInfo.pending, (state) => {
            state.orderInfoFetching = true;
            state.orderInfoError = false;
        });
        builder.addCase(fetchOrderInfo.fulfilled, (state, action: PayloadAction<IFetchOrderInfoResponse>) => {
            state.orderInfoFetching = false;
            state.orderInfoError = false;
            state.orderInfo = action.payload.orders[0];
        });
        builder.addCase(fetchOrderInfo.rejected, (state) => {
            state.orderInfoFetching = false;
            state.orderInfoError = true;
        });
    }
});

export const { cleanOrder } = orderSlice.actions