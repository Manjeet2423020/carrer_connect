import api from './api';

/**
 * 👤 Get User Profile API
 * Route: GET /api/v1/users/profile
 */
export const getUserProfileApi = async () => {
    const response = await api.get('/users/profile');
    return response.data;
};

/**
 * ✏️ Update Profile Details (Bio, Skills, Phone, Name) API
 * Route: PUT /api/v1/users/profile
 */
export const updateProfileApi = async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
};

/**
 * 📄 Upload Resume (PDF File) API
 * Route: POST /api/v1/users/upload-resume
 * Note: Key name 'resume' hona chahiye jo Multer backend me parse karega
 */
export const uploadResumeApi = async (fileFormData) => {
    const response = await api.post('/users/upload-resume', fileFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
