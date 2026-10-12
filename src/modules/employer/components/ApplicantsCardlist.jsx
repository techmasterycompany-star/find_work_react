import { useParams } from "react-router-dom";
import { useJobApplications } from "../hooks/useEmployerQueries";
import ApplicantsCard from "./ApplicantsCard";

export default function ApplicantsCardlist() {
  const { jobId } = useParams();
  const { data: applications = [], isLoading, isError } = useJobApplications(jobId);

  if (isLoading) {
    return (
      <div className="flex-1 py-12 text-center text-sm text-gray-500">
        Loading applicants…
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex-1 py-12 text-center text-sm text-red-500">
        Failed to load applicants.
      </div>
    );
  }
  if (!applications || applications.length === 0) {
    return (
      <div className="flex-1 py-12 text-center text-sm text-gray-500">
        No applicants yet.
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
      {applications.map((application) => {
        const candidate = application.candidate ?? application.applicant ?? application.user ?? {};
        const applicant = {
          id: candidate._id ?? candidate.id ?? application._id,
          name: candidate.name ?? "Candidate",
          job: candidate.headline ?? application.job?.title ?? "—",
          exp: candidate.experience_level ?? "—",
          img: candidate.avatarUrl ?? candidate.avatar ?? null,
          joindate: application.createdAt
            ? new Date(application.createdAt).toLocaleDateString()
            : "—",
          match: candidate.match ?? application.match_score ?? 0,
          status: application.status ?? "New",
        };
        return <ApplicantsCard key={applicant.id} applicant={applicant} />;
      })}
    </div>
  );
}
