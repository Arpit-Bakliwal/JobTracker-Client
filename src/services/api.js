import axios from 'axios';
import { store } from "../app/store";
import { setCredentials, clearCredentials } from '../features/auth/authSlice';
import { API_BASE_URL } from '../app/config';

// Base axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Send httpOnly cookie automatically
});

// Request interceptor
// Runs before every request - attaches access token from redux store
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [] //holds requests that came in while refresh was happening

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
}

// Response Interceptor
// Runs after evry response - handle 401 and silent refresh
api.interceptors.response.use(
    (response) => response, // 2xx - just return response
    async (error) => {
        const originalRequest = error.config;

        // if 401 and we haven't already retried this request
        if (error.response?.status === 401 && !originalRequest._retry) {
            // If refresh is already in progress - queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest) // retry with new token
                }).catch((err) => Promise.reject(err));
            }

            // Mark request as retried and start refresh
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh endpoint - httponly cookie sent automatically
                const { data } = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = data.data.accessToken;

                // Update redux store with new token
                store.dispatch(setCredentials({
                    user: store.getState().auth.user,
                    accessToken: newToken
                }));

                // resolve all queued requests with new token
                processQueue(null, newToken);

                // retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - session expired, log user out
                processQueue(refreshError, null);
                store.dispatch(clearCredentials());
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

const apiService = {
    get: (url, params = {}) =>
        api.get(url, { params }).then((res) => res.data),

    post: (url, body = {}) =>
        api.post(url, body).then((res) => res.data),

    put: (url, body = {}) =>
        api.put(url, body).then((res) => res.data),

    patch: (url, body = {}) =>
        api.patch(url, body).then((res) => res.data),

    delete: (url) =>
        api.delete(url).then((res) => res.data),
}

export { apiService };

export default api;