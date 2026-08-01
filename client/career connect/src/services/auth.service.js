import api from './api';

/**
 * 🔑 Login User API
 */
export const loginApi = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

/**
 * 📝 Register User API
 */
export const registerApi = async (userData) => {
    const isFormData = userData instanceof FormData;
    const response = await api.post('/auth/register', userData, {
        headers: {
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
    });
    return response.data;
};

/**
 * 🚪 Logout User API
 */
export const logoutApi = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

/**
 * 👤 Get Current User Profile API
 */
export const getProfileApi = async () => {
    const response = await api.get('/users/profile');
    return response.data;
};
