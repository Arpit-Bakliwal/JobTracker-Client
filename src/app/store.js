import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobSlice";
import uiReducer from "../features/ui/uiSlice"
import adminReducer from "../features/admin/adminSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobsReducer,
        ui: uiReducer,
        admin: adminReducer,
    }
});

export { store };
export default store;