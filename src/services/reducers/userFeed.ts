
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../utils/types';
import { IFeedState } from './feed';
 
 
const initialState: IFeedState = {
  isEstablishingConnection: false,
  isConnecting: false,
  isConnected: false,
  connectionError: null,
};
 
const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {
    ufConnecting: (state) => {
      state.isEstablishingConnection = true;
      state.isConnecting = true;
    },
    ufConnected: (state) => {
      state.isConnected = true;
      state.isConnecting = false;
      state.isEstablishingConnection = true;
    },
    ufDisconnect: (state) => {
      state.isConnected = false;
      state.isConnecting = false;
      state.isEstablishingConnection = false;
    },
    ufFetchOrdersFeed: ((state, action: PayloadAction<{
      success: boolean;
      orders: Array<IOrder>;
      total: number;
      totalToday: number;
    }>) => {
      state.success = action.payload.success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }),
    ufError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
  },
});
 
//export const feedActions = feedSlice.actions;
export const { ufConnecting, ufConnected, ufDisconnect, ufFetchOrdersFeed, ufError } = userFeedSlice.actions
 
export default userFeedSlice;