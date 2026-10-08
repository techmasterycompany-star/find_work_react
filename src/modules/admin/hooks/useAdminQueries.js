import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  activateUser,
  approveJob,
  deleteUser,
  getAllJobs,
  getAdminUsers,
  getMyNotifications,
  getReviewJobs,
  rejectJob,
  suspendUser,
} from '../services/adminApi';
import { adminKeys } from '../services/queryClient';

// ---------- Users ----------------------------------------------------

export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users,
    queryFn: getAdminUsers,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

export function useSuspendUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: suspendUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users }),
  });
}

export function useActivateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: activateUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users }),
  });
}

// ---------- Jobs (review queue) -------------------------------------

export function useReviewJobs() {
  return useQuery({
    queryKey: adminKeys.reviewJobs,
    queryFn: getReviewJobs,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

export function useApproveJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: approveJob,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.reviewJobs });
      qc.invalidateQueries({ queryKey: adminKeys.allJobs });
    },
  });
}

export function useRejectJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: rejectJob,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.reviewJobs });
      qc.invalidateQueries({ queryKey: adminKeys.allJobs });
    },
  });
}

// ---------- Jobs (all — overview totals) ----------------------------

export function useAllJobs() {
  return useQuery({
    queryKey: adminKeys.allJobs,
    queryFn: getAllJobs,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

// ---------- Notifications -------------------------------------------

export function useAdminNotifications() {
  return useQuery({
    queryKey: adminKeys.notifications,
    queryFn: getMyNotifications,
    select: (data) => (Array.isArray(data) ? data : data?.items ?? []),
  });
}

