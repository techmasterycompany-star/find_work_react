import { QueryClient } from '@tanstack/react-query';

export const adminQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: true,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const adminKeys = {
  users: ['admin', 'users'],
  reviewJobs: ['admin', 'review-jobs'],
  allJobs: ['admin', 'all-jobs'],
  notifications: ['admin', 'notifications'],
};
