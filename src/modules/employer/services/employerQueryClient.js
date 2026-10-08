import { QueryClient } from '@tanstack/react-query';

export const employerQueryClient = new QueryClient({
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

export const employerKeys = {
  jobs: ['employer', 'jobs'],
  jobDetail: (id) => ['employer', 'jobs', id],
  jobApplications: (jobId) => ['employer', 'applications', jobId],
  subscriptionPlans: ['employer', 'subscription-plans'],
  currentSubscription: ['employer', 'current-subscription'],
  payments: ['employer', 'payments'],
  notifications: ['employer', 'notifications'],
  technologies: ['employer', 'technologies'],
  categories: ['employer', 'categories'],
  employerProfile: ['employer', 'profile'],
};
