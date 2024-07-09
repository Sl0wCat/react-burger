import { cleanOrder, fetchOrder, fetchOrderInfo, initialState, orderSlice } from "./order";


describe('Tests for Order slice', () => {
    // Инициализация хранилища
    it("initialize with initialValue", () => {
        const orderSliceInit = orderSlice.reducer(initialState, { type: "unknown" });
        expect(orderSliceInit).toBe(initialState);
    });

    it("test clean order action", () => {
        const action = cleanOrder();
        const state = orderSlice.reducer({...initialState, order: {number: 123}}, action)
        expect(state).toEqual(initialState)
    });

    it('fetchOrder pending', () => {
        const action = {
            type: fetchOrder.pending.type,
        }
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: true,
        });
    });

    it('fetchOrder fulfilled', () => {
        const action = {
            type: fetchOrder.fulfilled.type,
            payload: {
                success: true,
                name: 'order',
                order: {
                    number: 123
                }
            }
        }
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            order: {
                number: 123
            }
        });
    });

    it('fetchOrder rejected', () => {
        const action = {
            type: fetchOrder.rejected.type,
        }
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: false,
            error: true
        });
    });

    it('fetchOrderInfo pending', () => {
        const action = {
            type: fetchOrderInfo.pending.type,
        }
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            orderInfoFetching: true,
        });
    });

    it('fetchOrderInfo fulfilled', () => {
        const action = {
            type: fetchOrderInfo.fulfilled.type,
            payload: {
                name: 'test',
                orders: [
                    {
                        ingredients: ['643d69a5c3f7b9001cfa093e'],
                        _id: '123',
                        status: 'done',
                        name: 'Test order',
                        number: 123,
                        createdAt: '2024-07-08 10:00:00',
                        updatedAt: '2024-07-08 10:00:15',
                        total: 2450
                    }
                ],
                success: true
            }
        }
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            orderInfoFetching: false,
            orderInfoError: false,
            orderInfo: {
                ingredients: ['643d69a5c3f7b9001cfa093e'],
                _id: '123',
                status: 'done',
                name: 'Test order',
                number: 123,
                createdAt: '2024-07-08 10:00:00',
                updatedAt: '2024-07-08 10:00:15',
                total: 2450
            }
        });
    });

    it('fetchOrderInfo rejected', () => {
        const action = {
            type: fetchOrderInfo.rejected.type,
        }
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            orderInfoFetching: false,
            orderInfoError: true
        });
    });
});