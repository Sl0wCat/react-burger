import { forgotPassword, initialState, resetPassword, resetPasswordSlice } from "./resetPassword";


describe('tests for Reset password slice', () => {

    // Инициализация хранилища
    it("initialize with initialValue", () => {
        const resetSliceInit = resetPasswordSlice.reducer(initialState, { type: "unknown" });
        expect(resetSliceInit).toBe(initialState);
    });

    it('forgotPassword pending', () => {
        const action = {
            type: forgotPassword.pending.type,
        }
        const state = resetPasswordSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: true,
        });
    });

    it('forgotPassword fulfilled', () => {
        const action = {
            type: forgotPassword.fulfilled.type,
            payload: {
                success: true,
                message: 'test message',
            }
        }
        const state = resetPasswordSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: false,
            success: true,
            message: 'test message',
            resetMailSend: true
        });
    });

    it('forgotPassword rejected', () => {
        const action = {
            type: forgotPassword.rejected.type,
        }
        const state = resetPasswordSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: false,
            error: true,
        });
    });

    it('resetPassword pending', () => {
        const action = {
            type: resetPassword.pending.type,
        }
        const state = resetPasswordSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: true,
        });
    });

    it('resetPassword fulfilled', () => {
        const action = {
            type: resetPassword.fulfilled.type,
            payload: {
                success: true,
                message: 'test message',
            }
        }
        const state = resetPasswordSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: false,
            successReset: true,
            message: 'test message',
            resetMailSend: false
        });
    });

    it('resetPassword rejected', () => {
        const action = {
            type: resetPassword.rejected.type,
        }
        const state = resetPasswordSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState, 
            loading: false,
            error: true,
            successReset: false,
        });
    });
})