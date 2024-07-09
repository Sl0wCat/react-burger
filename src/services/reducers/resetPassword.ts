import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../utils';

interface IForgotPassword {
    email: string;
}

interface IForgotPasswordResponse {
    success: boolean,
    message: string
}

export const forgotPassword = createAsyncThunk<IForgotPasswordResponse, IForgotPassword>(
    "forgotPassword",
    async (params) => {
    return request("password-reset", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
    });
});

export interface IResetPasswordForm {
    password: string,
    token: string
}

export const resetPassword = createAsyncThunk<IForgotPasswordResponse, IResetPasswordForm> (
    "resetPassword",
    async (params) => {
        return request("password-reset/reset", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params)
        });
    })

interface IResetPassword {
    loading: boolean,
    error: boolean,
    success: boolean,
    successReset: boolean,
    message: string,
    resetMailSend: boolean,
}

export const initialState: IResetPassword = {
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action: PayloadAction<IForgotPasswordResponse>) => {
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
