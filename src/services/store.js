import { configureStore, createSelector } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/burgerIngredients';
import { constructorSlice } from './reducers/burgerConstructor';
import { ingredientSlice } from './reducers/burgerIngredient';
import { orderSlice } from './reducers/order';
import { userSlice } from './reducers/user';
import { resetPasswordSlice } from './reducers/resetPassword';

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

export const getConstructor = (state) => state.burgerConstructor;
export const getOrder = (state) => state.order;
export const getUser = (state) => state.user.user;
export const getIngredients = (state) => state.ingredients.data;
export const getAuthChecked = (state) => state.user.isAuthChecked;
export const getPasswordReset = (state) => state.resetPassword.success;
export const getPasswordResetSuccess = (state) => state.resetPassword.successReset;
export const getResetMailSend = (state) => state.resetPassword.resetMailSend;
export const getLogoutSuccess = (state) => state.user.logoutSuccess;

export const getIngredient = (id) => (state) =>
    state.ingredients.data.find(item => item._id === id)