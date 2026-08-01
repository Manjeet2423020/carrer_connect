import axios from 'axios';

// Base Axios Instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true, // Allows HTTP-Only cookies (Refresh token)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Access Token to headers if present in localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiration & Automatic Refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 Unauthorized & not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt Refresh Token API call
                const res = await axios.post(
                    'http://localhost:5000/api/v1/auth/refresh-token',
                    {},
                    { withCredentials: true }
                );

                if (res.data?.success) {
                    const newAccessToken = res.data.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh token expired -> Logout user
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
