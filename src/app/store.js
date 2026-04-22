import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobSlice";
import uiReducer from "../features/ui/uiSlice"
import adminReducer from "../features/admin/adminSlice";
import notificationReducer from "../features/notifications/notificationSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobsReducer,
        ui: uiReducer,
        admin: adminReducer,
        notifications: notificationReducer,
    }
});

export { store };
export default store;