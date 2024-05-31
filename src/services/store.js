import { configureStore } from '@reduxjs/toolkit';
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
