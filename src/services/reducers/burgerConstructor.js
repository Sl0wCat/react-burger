import { createSlice } from '@reduxjs/toolkit'


export const constructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: {
        bun: null,
        filling: [],
        total: 0,
    },
    reducers: {
        addFilling: (state, action) => {state.filling.push({
            ...action.payload,
            index: state.filling.length
        })},
        addBun: (state, action) => {state.bun = action.payload},
        countTotal: (state) => {
            let total = state.filling.reduce((acc, p) => acc + p.price, 0);
            if (state.bun)
                total += state.bun.price * 2;
            state.total = total;
        },
        removeFilling: (state, action) => {
            state.filling.splice(action.payload.index, 1);
        },
        reorderFilling: (state, action) => {
            state.filling.splice(action.payload.hoverIndex, 0, state.filling.splice(action.payload.dragIndex, 1)[0]);
        }
      },
});

export const { addFilling, addBun, countTotal, removeFilling, reorderFilling } = constructorSlice.actions
