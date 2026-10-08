import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  cancelSubscription,
  closeJob,
  createCheckout,
  createComment,
  createJob,
  deleteJob,
  generateJobDescription,
  getCategories,
  getCurrentSubscription,
  getEmployerJobs,
  getEmployerNotifications,
  getEmployerProfile,
  getJobApplications,
  getJobComments,
  getPayments,
  getSubscriptionPlans,
  getTechnologies,
  markAllNotificationsRead,
  markNotificationRead,
  updateApplicationStatus,
  updateEmployerProfile,
  updateJob,
  uploadEmployerLogo,
} from '../services/employerApi';
import { employerKeys } from '../services/employerQueryClient';

// ---------- Jobs ----------------------------------------------------

export function useEmployerJobs() {
  return useQuery({
    queryKey: employerKeys.jobs,
    queryFn: getEmployerJobs,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

export function useJobApplications(jobId, options = {}) {
  return useQuery({
    queryKey: employerKeys.jobApplications(jobId),
    queryFn: () => getJobApplications(jobId),
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
    enabled: Boolean(jobId),
    ...options,
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.jobs }),
  });
}

export function useUpdateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateJob(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.jobs }),
  });
}

export function useCloseJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: closeJob,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.jobs }),
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.jobs }),
  });
}

// AI job description generator
export function useGenerateJobDescription() {
  return useMutation({
    mutationFn: generateJobDescription,
  });
}

// ---------- Technologies -------------------------------------------

export function useTechnologies() {
  return useQuery({
    queryKey: employerKeys.technologies,
    queryFn: getTechnologies,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

// ---------- Categories ---------------------------------------------

export function useCategories() {
  return useQuery({
    queryKey: employerKeys.categories,
    queryFn: getCategories,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
    // Fail silently — the page falls back to the hardcoded config
    retry: false,
  });
}

// ---------- Employer Profile ---------------------------------------

export function useEmployerProfile() {
  return useQuery({
    queryKey: employerKeys.employerProfile,
    queryFn: getEmployerProfile,
  });
}

export function useUpdateEmployerProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateEmployerProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.employerProfile }),
  });
}

export function useUploadEmployerLogo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadEmployerLogo,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.employerProfile }),
  });
}

// ---------- Subscriptions ------------------------------------------

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: employerKeys.subscriptionPlans,
    queryFn: getSubscriptionPlans,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

export function useCurrentSubscription() {
  return useQuery({
    queryKey: employerKeys.currentSubscription,
    queryFn: getCurrentSubscription,
  });
}

export function useCheckout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCheckout,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.currentSubscription }),
  });
}

export function useCancelSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.currentSubscription }),
  });
}

export function usePayments() {
  return useQuery({
    queryKey: employerKeys.payments,
    queryFn: getPayments,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

// ---------- Applications -------------------------------------------

export function useUpdateApplicationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, payload }) => updateApplicationStatus(applicationId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['employer', 'applications'] });
    },
  });
}

// ---------- Comments -----------------------------------------------

export function useCreateComment() {
  return useMutation({
    mutationFn: ({ jobId, content }) => createComment(jobId, content),
  });
}

export function useJobComments(jobId, options = {}) {
  return useQuery({
    queryKey: ['employer', 'comments', jobId],
    queryFn: () => getJobComments(jobId),
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
    enabled: Boolean(jobId),
    ...options,
  });
}

// ---------- Notifications ------------------------------------------

export function useEmployerNotifications() {
  return useQuery({
    queryKey: employerKeys.notifications,
    queryFn: getEmployerNotifications,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.notifications }),
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: employerKeys.notifications }),
  });
}
