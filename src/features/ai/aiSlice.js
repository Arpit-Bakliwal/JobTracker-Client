import { createSlice } from '@reduxjs/toolkit';
import { analyzeJob, getInterviewQuestions, improveBullet } from './aiThunks';

const initialState = {
    // Job analyzer
    analysisResult: null,
    analysisLoading: false,
    analysisError: null,

    // Interview questions
    questionsResult: null,
    questionsLoading: false,
    questionsError: null,

    // Bullet improver
    bulletResult: null,
    bulletLoading: false,
    bulletError: null,
};

const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        clearAnalysis: (state) => { state.analysisResult = null },
        clearQuestions: (state) => { state.questionsResult = null },
        clearBullet: (state) => { state.bulletResult = null },
    },
    extraReducers: (builder) => {
        // Analyze Job
        builder
            .addCase(analyzeJob.pending, (state) => {
                state.analysisLoading = true;
                state.analysisError = null;
                state.analysisResult = null;
            })
            .addCase(analyzeJob.fulfilled, (state, action) => {
                state.analysisLoading = false;
                state.analysisResult = action.payload;
            })
            .addCase(analyzeJob.rejected, (state, action) => {
                state.analysisLoading = false;
                state.analysisError = action.payload;
            });

        // Interview Questions
        builder
            .addCase(getInterviewQuestions.pending, (state) => {
                state.questionsLoading = true;
                state.questionsError = null;
                state.questionsResult = null;
            })
            .addCase(getInterviewQuestions.fulfilled, (state, action) => {
                state.questionsLoading = false;
                state.questionsResult = action.payload;
            })
            .addCase(getInterviewQuestions.rejected, (state, action) => {
                state.questionsLoading = false;
                state.questionsError = action.payload;
            });

        // Bullet Improver
        builder
            .addCase(improveBullet.pending, (state) => {
                state.bulletLoading = true;
                state.bulletError = null;
                state.bulletResult = null;
            })
            .addCase(improveBullet.fulfilled, (state, action) => {
                state.bulletLoading = false;
                state.bulletResult = action.payload;
            })
            .addCase(improveBullet.rejected, (state, action) => {
                state.bulletLoading = false
                state.bulletError = action.payload
            })
    },
})

export const { clearAnalysis, clearQuestions, clearBullet } = aiSlice.actions
export default aiSlice.reducer