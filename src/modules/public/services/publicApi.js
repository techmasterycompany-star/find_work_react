import apiClient from "../../../services/apiClient";

const unwrap = (res) => res.data?.data ?? res.data;

export const getPublicJobs = () => apiClient.get("/jobs").then(unwrap);

export const searchJobs = (params = {}) =>
  apiClient.get("/search/jobs", { params }).then(unwrap);

export const getJobById = (id) => apiClient.get(`/jobs/${id}`).then(unwrap);

export const getPublicCategories = () =>
  apiClient.get("/categories/").then(unwrap);

export const getPublicTechnologies = () =>
  apiClient.get("/technologies").then(unwrap);
