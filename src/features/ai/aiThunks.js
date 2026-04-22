import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';

export const analyzeJob = createAsyncThunk(
    'ai/analyzeJob',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await apiService.post('/ai/analyze', payload);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to analyze job'
            );
        }
    }
);

export const getInterviewQuestions = createAsyncThunk(
    'ai/interviewQuestions',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await apiService.post('/ai/interview-questions', payload);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to generate questions'
            );
        }
    }
);

export const improveBullet = createAsyncThunk(
    'ai/improveBullet',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await apiService.post('/ai/improve-bullet', payload);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to improve bullet'
            );
        }
    }
);