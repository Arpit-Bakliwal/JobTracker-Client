import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        clearCredentials: (state, action) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: () => {}, // thunks go here later
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;