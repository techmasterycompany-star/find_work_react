import { QueryClient } from "@tanstack/react-query";

export const candidateQueryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30 * 1000, refetchOnWindowFocus: true, retry: 1 },
    mutations: { retry: 0 },
  },
});


export const candidateKeys = {
  profile: ["candidate", "profile"],
  skills: ["candidate", "skills"],
  savedJobs: ["candidate", "saved-jobs"],
  savedJobCheck: (jobId) => ["candidate", "saved-jobs", "check", jobId],
  myApplications: ["candidate", "applications"],
  notifications: ["candidate", "notifications"],
  categories: ["candidate", "categories"],
  technologies: ["candidate", "technologies"],
};
