import api from './api';

/**
 * 📝 Candidate Apply Job API
 */
export const applyJobApi = async (jobId) => {
    const response = await api.post(`/applications/apply/${jobId}`);
    return response.data;
};

/**
 * 📋 Candidate Get Applied Jobs API
 */
export const getAppliedJobsApi = async () => {
    const response = await api.get('/applications/applied');
    return response.data;
};

/**
 * 👥 Recruiter Get Applicants for a Job API
 */
export const getApplicantsForJobApi = async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}/applicants`);
    return response.data;
};

/**
 * ⚡ Recruiter Update Application Status API
 */
export const updateApplicationStatusApi = async (applicationId, status) => {
    const response = await api.put(`/applications/status/${applicationId}`, { status });
    return response.data;
};
