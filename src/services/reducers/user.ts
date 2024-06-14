import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { api } from '../../utils/api';
import { TUser } from '../../utils/types';
import { TThunkAPI } from '../store';

export interface ILoginForm {
    email: string,
    password: string,
    name?: string,
}

interface ILoginResponse {
    success: boolean,
    accessToken?: string,
    refreshToken?: string,
    user: TUser
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

export const update = createAsyncThunk<IUpdate, TUser, TThunkAPI>(
    "update",
    async (params) => {
        const res = await api.updateUser(params);
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
        if (localStorage.getItem("accessToken")) {
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

interface IUser {
    user: TUser | null,
    isAuthChecked: boolean,
    success: boolean,
    logoutSuccess: boolean,
}

const initialState: IUser = {
    user: null,
    isAuthChecked: false,
    success: false,
    logoutSuccess: false,
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
            .addCase(login.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })

            .addCase(login.rejected, (state, action) => {
                  state.isAuthChecked = true;
                  alert(action.error.message);
                })

            .addCase(register.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })

            .addCase(update.fulfilled, (state, action: PayloadAction<IUpdate>) => {
                state.user = action.payload.user ? action.payload.user : null;
                alert('Ваши данные успешно обновлены');
            })
            .addCase(update.rejected, (state, action) => {
                state.isAuthChecked = true;
                alert(action.error.message);
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.logoutSuccess = true;
            })
      }
});

export const { setAuthChecked, setUser } = userSlice.actions;