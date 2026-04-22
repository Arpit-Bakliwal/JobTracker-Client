import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api"; 

export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (params = {}, { rejectWithValue }) => {
        try {
            const { data } = await apiService.get(`/admin/users`, params);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch users'
            );
        }
    }
);

export const updateUserRole = createAsyncThunk(
    "admin/updateUserRole",
    async ({id, role}, { rejectWithValue }) => {
        try {
            const { data } = await apiService.patch(`/admin/users/${id}/role`, { role });
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update role"
            );
        }
    }
);

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async ( id, { rejectWithValue }) => {
        try {
            const { data } = await apiService.delete(`/admin/users/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete user"
            );
        }

    }
);