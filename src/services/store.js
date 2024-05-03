import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/burgerIngredients';
import { constructorSlice } from './reducers/burgerConstructor';
import { ingredientSlice } from './reducers/burgerIngredient';
import { orderSlice } from './reducers/order';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice.reducer,
        burgerConstructor: constructorSlice.reducer,
        ingredient: ingredientSlice.reducer,
        order: orderSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})
