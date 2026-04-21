import axios from "axios";
import { apiService } from "../../services/api";
import { API_BASE_URL } from "../../app/config"
import { setCredentials, clearCredentials, setInitialized } from "./authSlice";

// Intialize Auth
// Called once when app loads - checks if user has a valid session
export const initializeAuth = () => async (dispatch) => {
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            {},
            { withCredentials: true } // sends httponly cookie
        );

        const response = data.data;

        dispatch(setCredentials({
            user: response.user,
            accessToken: response.accessToken,
        }));
    } catch (error) {
        dispatch(clearCredentials());
    } finally {
        // Whether success or failure — app is now initialized
        // Remove loading spinner and render the app
        dispatch(setInitialized())
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        const { data } = await apiService.post('/auth/login', credentials)

        dispatch(setCredentials({
            user: data.user,
            accessToken: data.accessToken,
        }))

        return { success: true }

    } catch (error) {
        const message = error.response?.data?.message || 'Login failed'
        return { success: false, message }
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const { data } = await apiService.post('/auth/register', userData)

        dispatch(setCredentials({
            user: data.user,
            accessToken: data.accessToken,
        }))

        return { success: true }

    } catch (error) {
        const message = error.response?.data?.message || 'Registration failed'
        return { success: false, message }
    }
};

export const logout = () => async (dispatch) => {
    try {
        // Tell backend to clear httpOnly cookie
        await apiService.post('/auth/logout')
    } catch (error) {
        // Even if backend call fails — clear frontend state
        // User should always be able to logout
    } finally {
        dispatch(clearCredentials())
    }
};