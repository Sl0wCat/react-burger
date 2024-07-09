import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { api } from '../../utils/api';
import { TUser } from '../../utils/types';

export interface ILoginForm {
    email: string,
    password: string,
    name?: string,
}

interface ILoginResponse {
    success: boolean,
    accessToken?: string,
    refreshToken?: string,
    user: TUser,
    error?: Object
}

export const login = createAsyncThunk<ILoginResponse, ILoginForm>(
    "login",
    async (params) => {
        const res = await api.login(params);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res;
    }
);

export const register = createAsyncThunk<ILoginResponse, ILoginForm>(
    "register",
    async (params) => {
        const res = await api.register(params);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res;
    }
);

interface IUpdate {
    success: boolean,
    user?: TUser,
    message?: string
}

export const update = createAsyncThunk<IUpdate, TUser>(
    "update",
    async (params) => {
        const res = await api.update(params);
        return res;
    }
);

export const logout = createAsyncThunk(
    "logout",
    async () => {
        await api.logout();
    }
);

export const checkUserAuth = createAsyncThunk(
    "checkAuth",
    async (_, {dispatch}) => {
        if (localStorage.getItem('accessToken')) {
            await api.getUser()
                .then(res => {
                    if (res.success)
                        dispatch(setUser(res))
                })
                .catch((e: Error) => {
                    console.log(e);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    }
)

export interface IUser {
    user: TUser | null,
    isAuthChecked: boolean,
    success: boolean,
    logoutSuccess: boolean,
    loading: boolean,
    error: string,
}

export const initialState: IUser = {
    user: null,
    isAuthChecked: false,
    success: false,
    logoutSuccess: false,
    loading: false,
    error: ''
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = initialState.user
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
                state.loading = false;
            })

            .addCase(login.rejected, (state, action) => {
                state.isAuthChecked = true;
                state.error = action.error.message ? action.error.message : '';
                state.loading = false;
            })

            .addCase(register.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })

            .addCase(update.fulfilled, (state, action: PayloadAction<IUpdate>) => {
                state.user = action.payload.user ? action.payload.user : null;
            })
            .addCase(update.rejected, (state, action) => {
                state.isAuthChecked = true;
                
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.logoutSuccess = true;
            })
    }
});

export const { setAuthChecked, setUser, resetUser } = userSlice.actions;