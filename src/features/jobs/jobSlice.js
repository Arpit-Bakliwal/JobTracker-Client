import { createSlice } from "@reduxjs/toolkit";
import {
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    fetchStats,
} from './jobsThunks'

const initialState = {
    jobs: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    currentJob: null,
    loading: false,
    error: null,
    filters: {
        search: '',
        status: '',
        page: 1,
        limit: 10,
    },
    stats: null,
    statsLoading: false,
};

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        resetFilters: (state) => {
            state.filters = initialState.filters
        },
    },
    extraReducers: (builder) => {
        // Fetch Jobs
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false
                state.jobs = action.payload.jobs
                state.totalCount = action.payload.totalCount
                state.totalPages = action.payload.totalPages
                state.currentPage = action.payload.currentPage
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            });
        
        // Create Job
        builder
            .addCase(createJob.pending, (state) => {
                state.loading = true
            })
            .addCase(createJob.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            });
        
        // Update Job
        builder
            .addCase(updateJob.pending, (state) => {
                state.loading = true
            })
            .addCase(updateJob.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            });
        
        // Delete Job
        builder
            .addCase(deleteJob.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteJob.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            });
        
        //  Fetch job stats
        builder
            .addCase(fetchStats.pending, (state) => {
                state.statsLoading = true;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.statsLoading = false;
            })
    },
});

export const { setFilters, resetFilters } = jobSlice.actions;
export default jobSlice.reducer;
