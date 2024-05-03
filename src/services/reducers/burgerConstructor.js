import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    bun: null,
    filling: [],
    total: 0,
}

export const constructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: initialState,
    reducers: {
        addFilling: {
            reducer: (state, action) => {
              state.filling.push({
                ...action.payload,
                index: state.filling.length,
            })},
            prepare: (filling) => {
              const uId = uuidv4()
              return { payload: { uId, ...filling } }
            },
          },
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
        },
        updateIndex: (state) => {
            state.filling = state.filling.map((item, index) => {
                return {
                    ...item,
                    index: index
                }
            });
        },
        cleanConstructor: () => initialState
      },
});

export const { addFilling, addBun, countTotal, removeFilling, reorderFilling, updateIndex, cleanConstructor } = constructorSlice.actions
