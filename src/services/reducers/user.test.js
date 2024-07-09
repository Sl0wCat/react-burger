import { userSlice, initialState, setAuthChecked, setUser, resetUser, login, register, update, logout } from "./user";

describe("tests for User Constructor Slice", () => {

    const testUserData = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'qwerty'
    }

    const testLoginUserData = {
        success: true,
        accessToken: '123',
        refreshToken: '123',
        user: testUserData
    }

    it("initialize with initialValue", () => {
        const userSliceInit = userSlice.reducer(initialState, { type: "unknown" });
        expect(userSliceInit).toBe(initialState);
    });

    it("set isAuthChecked", () => {
        const testData = true;
        const action = {
            type: setAuthChecked.type,
            payload: testData
        }
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isAuthChecked: true});
    });

    it("set user", () => {
        const action = {
            type: setUser.type,
            payload: testUserData
        }
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: testUserData});
    });

    it("reset user", () => {
        const testData = initialState.user;
        const action = {
            type: resetUser.type,
            payload: testData
        }
        const state = userSlice.reducer({...initialState, user: testUserData}, action);
        expect(state).toEqual(initialState);
    });

    it('login pending', () => {
        const testData = true;
        const action = {
            type: login.pending.type,
            payload: testData
        }
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    })

    it('login fullfilled', () => {
        const action = {
            type: login.fulfilled.type,
            payload: testLoginUserData
        }
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: testUserData, isAuthChecked: true});
    })

    it('login rejected', () => {
        const action = {
            type: login.rejected.type,
            error: {
                message: 'authorization failed:('
            }
        }
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isAuthChecked: true, loading: false, error: 'authorization failed:('});
    })

    it('register fullfilled', () => {
        const action = {
            type: register.fulfilled.type,
            payload: testLoginUserData
        }
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: testUserData, isAuthChecked: true});
    })

    it('update fullfilled', () => {
        const action = {
            type: update.fulfilled.type,
            payload: testLoginUserData
        }
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: testUserData});
    })

    it('update rejected', () => {
        const action = {
            type: update.rejected.type,
        }
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isAuthChecked: true});
    })

    it('logout fullfilled', () => {
        const action = {
            type: logout.fulfilled.type,
        }
        const state = userSlice.reducer({...initialState, user: testUserData}, action);
        expect(state).toEqual({...initialState, logoutSuccess: true});
    })

});