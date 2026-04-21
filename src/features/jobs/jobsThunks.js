import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api";

export const fetchJobs = createAsyncThunk(
    'jobs/fetchAll',
    async (filters, { rejectWithValue }) => {
        try {
            const { data } = await apiService.get('/jobs', filters);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch jobs'
            );
        }
    }
);

export const createJob = createAsyncThunk(
    'jobs/create',
    async (jobData, { rejectWithValue }) => {
        try {
            const { data } = await apiService.post('/jobs', jobData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create job'
            );
        }
    }
);

export const updateJob = createAsyncThunk(
    'jobs/update',
    async ({ id, jobData }, { rejectWithValue }) => {
        try {
            const { data } = await apiService.put(`/jobs/${id}`, jobData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update job'
            );
        }
    }
);

export const deleteJob = createAsyncThunk(
    'jobs/delete',
    async (id, { rejectWithValue }) => {
        try {
            await apiService.delete(`/jobs/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete job'
            );
        }
    }
);

export const fetchStats = createAsyncThunk(
    'jobs/stats',
    async (_, { rejectWithValue }) => {
        try{
            const { data } = await apiService.get(`/jobs/stats`);
            return data;
        }catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch job stats"
            );
        }
    }
)
