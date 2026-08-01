import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllJobsApi, getJobByIdApi } from '../services/job.service';

// 🔍 Fetch Jobs Thunk
export const fetchJobsThunk = createAsyncThunk(
    'jobs/fetchJobs',
    async (params = {}, { rejectWithValue }) => {
        try {
            const data = await getAllJobsApi(params);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs!');
        }
    }
);

// 🔍 Fetch Single Job Details Thunk
export const fetchJobDetailsThunk = createAsyncThunk(
    'jobs/fetchJobDetails',
    async (jobId, { rejectWithValue }) => {
        try {
            const data = await getJobByIdApi(jobId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch job details!');
        }
    }
);

const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobsList: [],
        pagination: {},
        selectedJob: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedJob: (state) => {
            state.selectedJob = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Jobs Cases
            .addCase(fetchJobsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobsList = action.payload.data.jobs;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(fetchJobsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Job Details Cases
            .addCase(fetchJobDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedJob = action.payload.data;
            })
            .addCase(fetchJobDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
