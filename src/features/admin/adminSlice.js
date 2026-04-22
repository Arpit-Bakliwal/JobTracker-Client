import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, updateUserRole, deleteUser } from "./adminThunks";

const initialState = {
    users: [],
    pagination: null,
    loading: false,
    error: null
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            });

        builder
            .addCase(updateUserRole.fulfilled, (state, action) => {
                const updatedUser = action.payload
                const index = state.users.findIndex((u) => u.id === updatedUser.id);
                if(index !== -1) {
                    state.users[index].role = updatedUser.role;
                }
            });
        
        builder
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u.id !== action.payload);
            });
    }
})


export default adminSlice.reducer;