import { useQuery } from "@tanstack/react-query";
import {
  getPublicJobs,
  searchJobs,
  getJobById,
  getPublicCategories,
  getPublicTechnologies,
} from "../services/publicApi";
import {
  toJobCard,
  deriveCompanies,
  toCompanyCard,
} from "../services/publicAdapters";

export function usePublicJobs() {
  return useQuery({
    queryKey: ["public", "jobs"],
    queryFn: getPublicJobs,
    select: (data) => {
      const list = Array.isArray(data) ? data : (data?.items ?? []);
      return list.map(toJobCard).filter(Boolean);
    },
  });
}

export function useSearchJobs(params = {}, enabled = true) {
  return useQuery({
    queryKey: ["public", "search", params],
    queryFn: () => searchJobs(params),
    enabled,
    select: (data) => {
      const list =
        data?.jobs ?? data?.items ?? (Array.isArray(data) ? data : []);
      return {
        jobs: list.map(toJobCard).filter(Boolean),
        pagination: data?.pagination ?? null,
      };
    },
  });
}

export function useJob(id, enabled = true) {
  return useQuery({
    queryKey: ["public", "jobs", id],
    queryFn: () => getJobById(id),
    enabled: Boolean(id) && enabled,
    select: (data) => toJobCard(data),
  });
}

export function useCompanies() {
  return useQuery({
    queryKey: ["public", "companies"],
    queryFn: getPublicJobs,
    select: (data) => {
      const list = Array.isArray(data) ? data : (data?.items ?? []);
      return deriveCompanies(list);
    },
  });
}

export function useCompanyById(companyId, enabled = true) {
  return useQuery({
    queryKey: ["public", "companies", companyId],
    queryFn: getPublicJobs,
    enabled: Boolean(companyId) && enabled,
    select: (data) => {
      const list = Array.isArray(data) ? data : (data?.items ?? []);
      const jobsForEmployer = list.filter((j) => {
        const e = j.employer ?? j.company ?? {};
        const id = e._id ?? e.id ?? e.userId;
        return String(id) === String(companyId);
      });
      if (jobsForEmployer.length === 0) return null;
      return toCompanyCard(jobsForEmployer);
    },
  });
}

export function useTopCompanies(limit = 4) {
  return useQuery({
    queryKey: ["public", "top-companies", limit],
    queryFn: getPublicJobs,
    select: (data) => {
      const list = Array.isArray(data) ? data : (data?.items ?? []);
      const companies = deriveCompanies(list);
      return companies
        .sort((a, b) => (b.openjobsnum ?? 0) - (a.openjobsnum ?? 0))
        .slice(0, limit);
    },
  });
}

export function usePublicCategories() {
  return useQuery({
    queryKey: ["public", "categories"],
    queryFn: getPublicCategories,
    retry: false,
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

export function usePublicTechnologies() {
  return useQuery({
    queryKey: ["public", "technologies"],
    queryFn: getPublicTechnologies,
    retry: false,
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
