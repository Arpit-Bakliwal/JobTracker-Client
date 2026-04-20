import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    totalCount: 0,
    currentJob: null,
    loading: false,
    error: null,
};

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {},
    extraReducers: () => {},
});

export default jobSlice.reducer;
