import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/burgerIngredients';
import { constructorSlice } from './reducers/burgerConstructor';
import { ingredientSlice } from './reducers/burgerIngredient';
import { orderSlice } from './reducers/order';
import { userSlice } from './reducers/user';
import { resetPasswordSlice } from './reducers/resetPassword';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TIngredient } from '../utils/types';
import * as authApi from '../utils/api';



export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice.reducer,
        burgerConstructor: constructorSlice.reducer,
        ingredient: ingredientSlice.reducer,
        order: orderSlice.reducer,
        user: userSlice.reducer,
        resetPassword: resetPasswordSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
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

export const getIngredient = (id: string) => (state: RootState): TIngredient | null => {
    const res = state.ingredients.data.find((item: TIngredient) => item._id === id)
    return res ? res : null;
}
    
export type TThunkAPI = {
    extra: {
      authApi: typeof authApi,
    }
  }
