import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    item: {
        id: null,
        name: "",
        image_large: "",
        proteins: 0,
        calories: 0,
        fat: 0,
        carbohydrates: 0
    }
    
}

export const ingredientSlice = createSlice({
    name: "burgerIngredient",
    initialState: initialState,
    reducers: {
        setIngredient: (state, action) => {
            state.item = action.payload
        },
        cleanIngredient: (state) => {
            state.item = initialState
        }
      },
});

export const { setIngredient, cleanIngredient } = ingredientSlice.actions