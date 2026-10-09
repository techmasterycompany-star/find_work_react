import apiClient from "../../../services/apiClient";

const unwrap = (res) => res.data?.data ?? res.data;

export const getJobById = (id) => apiClient.get(`/jobs/${id}`).then(unwrap);
export const applyToJob = (jobId, formData) =>
  apiClient
    .post(`/application/${jobId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(unwrap);

export const generateCoverLetter = (jobId, resumeText) =>
  apiClient
    .post(`/application/cover-letter/${jobId}`, { resume_text: resumeText })
    .then(unwrap);
