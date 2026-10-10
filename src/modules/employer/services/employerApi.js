import apiClient from "../../../services/apiClient";

export const getEmployerJobs = () =>
  apiClient.get("/jobs/employeeJobs").then((res) => res.data?.data ?? res.data);

export const getAllJobs = () =>
  apiClient.get("/jobs").then((res) => res.data?.data ?? res.data);

export const getJobById = (id) =>
  apiClient.get(`/jobs/${id}`).then((res) => res.data?.data ?? res.data);

export const createJob = (payload) =>
  apiClient
    .post("/jobs/create", payload)
    .then((res) => res.data?.data ?? res.data);

export const updateJob = (id, payload) =>
  apiClient
    .patch(`/jobs/update/${id}`, payload)
    .then((res) => res.data?.data ?? res.data);

export const closeJob = (id) =>
  apiClient
    .patch(`/jobs/close/${id}`, {})
    .then((res) => res.data?.data ?? res.data);

export const deleteJob = (id) =>
  apiClient
    .delete(`/jobs/delete/${id}`)
    .then((res) => res.data?.data ?? res.data);

export const generateJobDescription = (payload) =>
  apiClient
    .post("/jobs/generate-description", payload)
    .then((res) => res.data?.data ?? res.data);

export const getJobApplications = (jobId) =>
  apiClient
    .get(`/application/job/${jobId}`)
    .then((res) => res.data?.data ?? res.data);

export const updateApplicationStatus = (applicationId, payload) =>
  apiClient
    .patch(`/application/${applicationId}/status`, payload)
    .then((res) => res.data?.data ?? res.data);

export const getSubscriptionPlans = () =>
  apiClient
    .get("/subscriptions/plans")
    .then((res) => res.data?.data ?? res.data);

export const getCurrentSubscription = () =>
  apiClient
    .get("/subscriptions/current")
    .then((res) => res.data?.data ?? res.data);

export const createCheckout = (payload) =>
  apiClient
    .post("/subscriptions/checkout", payload)
    .then((res) => res.data?.data ?? res.data);

export const cancelSubscription = () =>
  apiClient
    .post("/subscriptions/cancel")
    .then((res) => res.data?.data ?? res.data);

export const getPayments = () =>
  apiClient
    .get("/subscriptions/payments")
    .then((res) => res.data?.data ?? res.data);

export const getTechnologies = () =>
  apiClient.get("/technologies").then((res) => res.data?.data ?? res.data);

export const getCategories = () =>
  apiClient.get("/categories/").then((res) => res.data?.data ?? res.data);

export const getEmployerProfile = () =>
  apiClient.get("/employer/profile").then((res) => res.data?.data ?? res.data);

export const updateEmployerProfile = (payload) =>
  apiClient
    .put("/employer/profile", payload)
    .then((res) => res.data?.data ?? res.data);

export const uploadEmployerLogo = (file) => {
  const formData = new FormData();
  formData.append("logo", file);
  return apiClient
    .post("/employer/logo", formData)
    .then((res) => res.data?.data ?? res.data);
};

export const createComment = (jobId, content) =>
  apiClient
    .post(`/comments/${jobId}`, { content })
    .then((res) => res.data?.data ?? res.data);

export const getJobComments = (jobId) =>
  apiClient.get(`/comments/${jobId}`).then((res) => res.data?.data ?? res.data);

export const getEmployerNotifications = () =>
  apiClient.get("/notifications/my").then((res) => res.data?.data ?? res.data);

export const markAllNotificationsRead = () =>
  apiClient
    .patch("/notifications/read-all")
    .then((res) => res.data?.data ?? res.data);

export const markNotificationRead = (id) =>
  apiClient
    .patch(`/notifications/${id}/read`)
    .then((res) => res.data?.data ?? res.data);
