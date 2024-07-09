import { cleanIngredient, ingredientSlice, initialState, setIngredient } from "./burgerIngredient";

describe('Tests for Burger ingredient slice', () => {
    const testIngredient = {
        id: 123,
        name: "Мягкая французская булка",
        image_large: "",
        proteins: 50,
        calories: 500,
        fat: 80,
        carbohydrates: 250
    }
    
    // Инициализация хранилища
    it("initialize with initialValue", () => {
        const ingredientSliceInit = ingredientSlice.reducer(initialState, { type: "unknown" });
        expect(ingredientSliceInit).toBe(initialState);
    });

    it("test setIngredient action", () => {

        const action = setIngredient(testIngredient);
        const state = ingredientSlice.reducer(initialState, action);
        expect(state).toEqual({
            item: testIngredient
        });
    
    });

    it("test cleanIngredient action", () => {

        const action = cleanIngredient();
        const state = ingredientSlice.reducer({item: testIngredient}, action);
        expect(state).toEqual(initialState);
    
    });
});