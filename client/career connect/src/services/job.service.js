import api from './api';

/**
 * 🔍 Fetch All Jobs with Search, Filter & Pagination API
 */
export const getAllJobsApi = async (params = {}) => {
    const response = await api.get('/jobs', { params });
    return response.data;
};

/**
 * 🔍 Fetch Single Job Details by ID API
 */
export const getJobByIdApi = async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
};

/**
 * 🔖 Toggle Save / Bookmark Job API
 */
export const toggleSaveJobApi = async (jobId) => {
    const response = await api.post(`/jobs/bookmark/${jobId}`);
    return response.data;
};
