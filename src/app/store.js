import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobSlice";
import uiReducer from "../features/ui/uiSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobsReducer,
        ui: uiReducer,
    }
});

export { store };
export default store;