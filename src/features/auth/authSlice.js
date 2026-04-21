import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isInitialized: false, // has app checked session yet
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
        setInitialized: (state) => {
            state.isInitialized = true // called after refresh attempt - success or failuer
        }
    },
    extraReducers: () => {}, // thunks go here later
});

export const { setCredentials, clearCredentials, setInitialized } = authSlice.actions;
export default authSlice.reducer;