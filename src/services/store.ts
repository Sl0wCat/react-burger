import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/burgerIngredients';
import { constructorSlice } from './reducers/burgerConstructor';
import { ingredientSlice } from './reducers/burgerIngredient';
import { orderSlice } from './reducers/order';
import { userSlice } from './reducers/user';
import { resetPasswordSlice } from './reducers/resetPassword';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IOrder, TIngredient, TOrderIngredients } from '../utils/types';
import * as authApi from '../utils/api';
import { socketMiddleware } from './middleware/socketMiddleware';
import feedSlice, { connected, disconnect, fetchOrdersFeed, connecting, error } from './reducers/feed';
import userFeedSlice, { ufConnected, ufConnecting, ufDisconnect, ufError, ufFetchOrdersFeed } from './reducers/userFeed';
import { wsConnect, wsDisconnect } from './middleware/actions';

const feedMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: connecting,
  onOpen: connected,
  onClose: disconnect,
  onError: error,
  onMessage: fetchOrdersFeed,
});

const userFeedMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: ufConnecting,
  onOpen: ufConnected,
  onClose: ufDisconnect,
  onError: ufError,
  onMessage: ufFetchOrdersFeed,
}, true);

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  ingredient: ingredientSlice.reducer,
  order: orderSlice.reducer,
  user: userSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  feed: feedSlice.reducer,
  userFeed: userFeedSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([feedMiddleware, userFeedMiddleware])
    },
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const getConstructor = (state: RootState) => state.burgerConstructor;
export const getOrder = (state: RootState) => state.order;
export const getUser = (state: RootState) => state.user.user;
export const getIngredients = (state: RootState) => state.ingredients.data;
export const getAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const getPasswordReset = (state: RootState) => state.resetPassword.success;
export const getPasswordResetSuccess = (state: RootState) => state.resetPassword.successReset;
export const getResetMailSend = (state: RootState) => state.resetPassword.resetMailSend;
export const getLogoutSuccess = (state: RootState) => state.user.logoutSuccess;
export const getOrdersList = (state: RootState) => state.feed.orders;
export const getUserOrdersList = (state: RootState) => state.userFeed.orders;
export const getOrderInfoRequest = (state: RootState) => state.order.orderInfo;
export const getOrdersTotalCount = (state: RootState) => state.feed.total;
export const getOrdersTodayCount = (state: RootState) => state.feed.totalToday;
export const getOrderInfoFetching = (state: RootState) => state.order.orderInfoFetching
export const getOrderInfoError = (state: RootState) => state.order.orderInfoError;
export const getLoginError = (state: RootState) => state.user.error;

export const getIngredient = (id: string) => (state: RootState): TIngredient | null => {
    const res = state.ingredients.dataObject[id]
    return res ? res : null;
}

export const getOrderIngredients = (ids: Array<string>) => (state: RootState): TOrderIngredients | null => {
  //const res = state.ingredients.data.filter((item: TIngredient) => ids.includes(item._id))
  //return res ? res : null;
  const res = ids.reduce(function(res: TOrderIngredients, id: string) {
    const ingredient = state.ingredients.data?.find((item) => item._id === id)
    return ingredient 
      ? {
        ...res,
        [id]: {
          ...ingredient,
          count: res[id] && res[id].count ? res[id].count! + 1 : 1
        } 
      }
      : {
        ...res
      } 

  }, {} as {});
  return res ? res : null;
}

export const getOrdersByStatus = (status: string) => (state: RootState): Array<IOrder> | null => {
  const res = state.feed.orders?.filter((order) => order.status === status);
  return res ? res.length > 20 ? res.slice(0, 20) : res : null;
}

export const getOrderInfo = (number: number) => (state: RootState): IOrder | null => {
  let res = state.feed.orders?.find((item: IOrder) => item.number === number);
  if (res)
    return res;
  res = state.userFeed.orders?.find((item: IOrder) => item.number === number);
  if (res)
    return res;
  if (state.order.orderInfo && state.order.orderInfo.number === number)
    return state.order.orderInfo;
  return null;
}
