import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils';

export const forgotPassword = createAsyncThunk("forgotPassword", async (params) => {
    return request("password-reset", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
    });
});

export const resetPassword = createAsyncThunk("resetPassword", async (params) => {
    return request("password-reset/reset", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
    });
})


const initialState = {
    loading: false,
    error: false,
    success: false,
    successReset: false,
    message: '',
    // Флаг о том, что на страницу сброса пароля перешли после заполнения формы восстановления пароля
    resetMailSend: false,
}

export const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(forgotPassword.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
            state.resetMailSend = true;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(resetPassword.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.successReset = action.payload.success;
            state.message = action.payload.message;
            state.resetMailSend = false;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.successReset = false;
        });
    }
});
