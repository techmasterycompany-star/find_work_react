import apiClient from "../../../services/apiClient";


export const getAdminUsers = () =>
  apiClient.get("/admin/users").then((res) => res.data?.data ?? res.data);

export const suspendUser = (userId) =>
  apiClient
    .patch(`/admin/users/${userId}/suspend`)
    .then((res) => res.data?.data ?? res.data);

export const activateUser = (userId) =>
  apiClient
    .patch(`/admin/users/${userId}/activate`)
    .then((res) => res.data?.data ?? res.data);

export const deleteUser = (userId) =>
  apiClient
    .delete(`/admin/users/${userId}`)
    .then((res) => res.data?.data ?? res.data);


export const getReviewJobs = () =>
  apiClient.get("/admin/reviewjobs").then((res) => res.data?.data ?? res.data);

export const approveJob = (jobId) =>
  apiClient
    .post(`/admin/approve/${jobId}`)
    .then((res) => res.data?.data ?? res.data);

export const rejectJob = (jobId) =>
  apiClient
    .post(`/admin/reject/${jobId}`)
    .then((res) => res.data?.data ?? res.data);


export const getAllJobs = () =>
  apiClient.get("/jobs").then((res) => res.data?.data ?? res.data);


export const getMyNotifications = () =>
  apiClient.get("/notifications/my").then((res) => res.data?.data ?? res.data);
