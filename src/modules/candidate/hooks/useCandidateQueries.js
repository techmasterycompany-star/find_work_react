import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { candidateKeys } from "../services/candidateQueryClient";
import {
  getSavedJobs,
  saveJob,
  unsaveJobByJobId,
  unsaveJobByWishlistId,
  checkSavedJob,
  getCandidateProfile,
  updateCandidateProfile,
  updateCandidateSkills,
  uploadCandidateResume,
  getMyApplications,
  withdrawApplication,
  getCandidateNotifications,
  markAllCandidateNotificationsRead,
  markCandidateNotificationRead,
  getCategories,
  getTechnologies,
} from "../services/candidateApi";


export function useSavedJobs() {
  const savedJobsQuery = useQuery({
    queryKey: candidateKeys.savedJobs,
    queryFn: getSavedJobs,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });

  const myAppsQuery = useQuery({
    queryKey: candidateKeys.myApplications,
    queryFn: getMyApplications,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });

  return {
    ...savedJobsQuery,
    myApplications: myAppsQuery.data ?? [],
  };
}

export function useSaveJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (jobId) => saveJob(jobId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: candidateKeys.savedJobs });
      qc.invalidateQueries({ queryKey: ["candidate", "saved-jobs"] });
    },
  });
}

export function useUnsaveJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, wishlistId } = {}) => {
      if (jobId) return unsaveJobByJobId(jobId);
      if (wishlistId) return unsaveJobByWishlistId(wishlistId);
      return Promise.reject(new Error("useUnsaveJob requires jobId or wishlistId"));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: candidateKeys.savedJobs });
    },
  });
}

export function useCheckSavedJob(jobId, enabled = true) {
  return useQuery({
    queryKey: candidateKeys.savedJobCheck(jobId),
    queryFn: () => checkSavedJob(jobId),
    enabled: Boolean(jobId) && enabled,
    select: (data) => Boolean(data?.exists ?? data),
  });
}

export function useCandidateProfile() {
  return useQuery({
    queryKey: candidateKeys.profile,
    queryFn: getCandidateProfile,
  });
}

export function useUpdateCandidateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateCandidateProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: candidateKeys.profile });
    },
  });
}

export function useUpdateCandidateSkills() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (skills) => updateCandidateSkills(skills),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: candidateKeys.profile });
      qc.invalidateQueries({ queryKey: candidateKeys.skills });
    },
  });
}

export function useUploadCandidateResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file) => uploadCandidateResume(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: candidateKeys.profile });
    },
  });
}

export function useMyApplications() {
  return useQuery({
    queryKey: candidateKeys.myApplications,
    queryFn: getMyApplications,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

export function useWithdrawApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (applicationId) => withdrawApplication(applicationId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: candidateKeys.myApplications });
    },
  });
}

export function useCandidateNotifications() {
  return useQuery({
    queryKey: candidateKeys.notifications,
    queryFn: getCandidateNotifications,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

export function useMarkAllCandidateNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllCandidateNotificationsRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: candidateKeys.notifications });
    },
  });
}

export function useMarkCandidateNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => markCandidateNotificationRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: candidateKeys.notifications });
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: candidateKeys.categories,
    queryFn: getCategories,
    retry: false,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

export function useTechnologies() {
  return useQuery({
    queryKey: candidateKeys.technologies,
    queryFn: getTechnologies,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}
