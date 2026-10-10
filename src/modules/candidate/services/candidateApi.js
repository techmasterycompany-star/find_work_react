import apiClient from "../../../services/apiClient";

const unwrap = (res) => res.data?.data ?? res.data;

export const getSavedJobs = () => apiClient.get("/wishlist").then(unwrap);

export const saveJob = (jobId) =>
  apiClient.post("/wishlist", { job_id: jobId }).then(unwrap);

export const unsaveJobByWishlistId = (wishlistItemId) =>
  apiClient.delete(`/wishlist/${wishlistItemId}`).then(unwrap);

export const unsaveJobByJobId = (jobId) =>
  apiClient.delete(`/wishlist/job/${jobId}`).then(unwrap);

export const checkSavedJob = (jobId) =>
  apiClient.get(`/wishlist/check/${jobId}`).then(unwrap);

export const getCandidateProfile = () =>
  apiClient.get("/candidate/profile").then(unwrap);

export const updateCandidateProfile = (payload) =>
  apiClient.put("/candidate/profile", payload).then(unwrap);

export const updateCandidateSkills = (skills) =>
  apiClient.put("/candidate/skills", { skills }).then(unwrap);

export const uploadCandidateResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return apiClient.post("/candidate/resume", formData).then(unwrap);
};

export const getMyApplications = () =>
  apiClient.get("/application/my").then(unwrap);

export const withdrawApplication = (applicationId) =>
  apiClient.delete(`/application/${applicationId}`).then(unwrap);

export const getCandidateNotifications = () =>
  apiClient.get("/notifications/my").then(unwrap);

export const markAllCandidateNotificationsRead = () =>
  apiClient.patch("/notifications/read-all").then(unwrap);

export const markCandidateNotificationRead = (id) =>
  apiClient.patch(`/notifications/${id}/read`).then(unwrap);

export const getCategories = () => apiClient.get("/categories/").then(unwrap);

export const getTechnologies = () =>
  apiClient.get("/technologies").then(unwrap);
