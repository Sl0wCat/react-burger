import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../utils/api';

export const login = createAsyncThunk(
    "login",
    async (params) => {
        const res = await api.login(params);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const register = createAsyncThunk(
    "register",
    async (params) => {
        const res = await api.register(params);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const update = createAsyncThunk(
    "update",
    async (params) => {
        const res = await api.updateUser(params);
        return res.user;
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
                .then(res => dispatch(setUser(res.user)))
                .catch((err) => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    }
)


const initialState = {
    user: null,
    isAuthChecked: false,
    success: false,
    logoutSuccess: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
              state.user = action.payload;
              state.isAuthChecked = true;
            })

            .addCase(login.rejected, (state, action) => {
                  state.isAuthChecked = true;
                  alert(action.error.message);
                })

            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })

            .addCase(update.fulfilled, (state, action) => {
                state.user = action.payload;
                alert('Ваши данные успешно обновлены');
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.logoutSuccess = true;
            })
      }
});

export const { setAuthChecked, setUser } = userSlice.actions;