import { fetchIngredients, ingredientsSlice, initialState } from "./burgerIngredients";


describe('Tests for Ingredients slice', () => {
    // Инициализация хранилища
    it("initialize with initialValue", () => {
        const ingredientSliceInit = ingredientsSlice.reducer(initialState, { type: "unknown" });
        expect(ingredientSliceInit).toBe(initialState);
    });

    it('fetchIngredients pending', () => {
        const action = {
            type: fetchIngredients.pending.type,
        }
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: true,
        });
    });

    it('fetchIngredients fulfilled', () => {
        const testData = [
            {
                name: 'Мягкая французская булка',
                type: 'bun',
                calories: 100500,
                carbohydrates: 620,
                fat: 123,
                image: 'test-image.jpg',
                image_large: 'large-test-image.jpg',
                image_mobile: 'mobile-test-image.jpg',
                price: 50,
                proteins: 200,
                __v: 123,
                _id: 123
            },
            {
                name: 'Соевый соус',
                type: 'sauce',
                calories: 100500,
                carbohydrates: 620,
                fat: 123,
                image: 'test-image.jpg',
                image_large: 'large-test-image.jpg',
                image_mobile: 'mobile-test-image.jpg',
                price: 50,
                proteins: 200,
                __v: 321,
                _id: 321
            }
        ]
        const action = {
            type: fetchIngredients.fulfilled.type,
            payload: {
                success: true,
                data: testData
            }
        }
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            data: testData,
            dataObject: {
                '123': {
                    name: 'Мягкая французская булка',
                    type: 'bun',
                    calories: 100500,
                    carbohydrates: 620,
                    fat: 123,
                    image: 'test-image.jpg',
                    image_large: 'large-test-image.jpg',
                    image_mobile: 'mobile-test-image.jpg',
                    price: 50,
                    proteins: 200,
                    __v: 123,
                    _id: 123
                },
                '321': {
                    name: 'Соевый соус',
                    type: 'sauce',
                    calories: 100500,
                    carbohydrates: 620,
                    fat: 123,
                    image: 'test-image.jpg',
                    image_large: 'large-test-image.jpg',
                    image_mobile: 'mobile-test-image.jpg',
                    price: 50,
                    proteins: 200,
                    __v: 321,
                    _id: 321
                }
            }
        });

        
    });

    it('fetchIngredients rejected', () => {
        const action = {
            type: fetchIngredients.rejected.type,
        }
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: false,
            error: true,
        });
    });
    
});