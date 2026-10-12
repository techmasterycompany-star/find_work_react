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


export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users,
    queryFn: getAdminUsers,
    select: (data) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.items)) return data.items;
      if (Array.isArray(data?.users)) return data.users;
      if (Array.isArray(data?.jobs)) return data.jobs;
      if (Array.isArray(data?.categories)) return data.categories;
      if (Array.isArray(data?.technologies)) return data.technologies;
      if (Array.isArray(data?.notifications)) return data.notifications;
      if (Array.isArray(data?.data)) return data.data;
      if (Array.isArray(data?.docs)) return data.docs;
      return [];
    },
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
    select: (data) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.items)) return data.items;
      if (Array.isArray(data?.users)) return data.users;
      if (Array.isArray(data?.jobs)) return data.jobs;
      if (Array.isArray(data?.categories)) return data.categories;
      if (Array.isArray(data?.technologies)) return data.technologies;
      if (Array.isArray(data?.notifications)) return data.notifications;
      if (Array.isArray(data?.data)) return data.data;
      if (Array.isArray(data?.docs)) return data.docs;
      return [];
    },
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
    select: (data) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.items)) return data.items;
      if (Array.isArray(data?.users)) return data.users;
      if (Array.isArray(data?.jobs)) return data.jobs;
      if (Array.isArray(data?.categories)) return data.categories;
      if (Array.isArray(data?.technologies)) return data.technologies;
      if (Array.isArray(data?.notifications)) return data.notifications;
      if (Array.isArray(data?.data)) return data.data;
      if (Array.isArray(data?.docs)) return data.docs;
      return [];
    },
  });
}

// ---------- Notifications -------------------------------------------

export function useAdminNotifications() {
  return useQuery({
    queryKey: adminKeys.notifications,
    queryFn: getMyNotifications,
    select: (data) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.items)) return data.items;
      if (Array.isArray(data?.users)) return data.users;
      if (Array.isArray(data?.jobs)) return data.jobs;
      if (Array.isArray(data?.categories)) return data.categories;
      if (Array.isArray(data?.technologies)) return data.technologies;
      if (Array.isArray(data?.notifications)) return data.notifications;
      if (Array.isArray(data?.data)) return data.data;
      if (Array.isArray(data?.docs)) return data.docs;
      return [];
    },
  });
}

