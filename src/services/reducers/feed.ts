
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../utils/types';
 
export interface IFeedState {
  isEstablishingConnection: boolean;
  isConnecting: boolean;
  isConnected: boolean;
  success?: boolean;
  orders?: Array<IOrder>;
  total?: number;
  totalToday?: number;
  connectionError: string | null;
}
 
export const initialState: IFeedState = {
  isEstablishingConnection: false,
  isConnecting: false,
  isConnected: false,
  connectionError: null,
};
 
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    connecting: (state) => {
      state.isConnecting = true;
    },
    connected: (state) => {
      state.isConnecting = false;
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    disconnect: (state) => {
      state.isConnecting = false;
      state.isConnected = false;
      state.isEstablishingConnection = false;
    },
    fetchOrdersFeed: ((state, action: PayloadAction<{
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
    error: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
  },
});
 
//export const feedActions = feedSlice.actions;
export const { connecting, connected, disconnect, fetchOrdersFeed, error } = feedSlice.actions
 
export default feedSlice;