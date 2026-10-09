
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getJobById,
  applyToJob,
  generateCoverLetter,
} from "../services/jobDetailsApi";
import { toJobCard } from "../services/publicAdapters";

export function useJobDetails(jobId, enabled = true) {
  return useQuery({
    queryKey: ["public", "jobs", jobId],
    queryFn: () => getJobById(jobId),
    enabled: Boolean(jobId) && enabled,
    select: (data) => toJobCard(data),
  });
}


export function useApplyJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, formData }) => applyToJob(jobId, formData),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["candidate", "applications"] });
    },
  });
}

export function useGenerateCoverLetter() {
  return useMutation({
    mutationFn: ({ jobId, resumeText }) => generateCoverLetter(jobId, resumeText),
  });
}
