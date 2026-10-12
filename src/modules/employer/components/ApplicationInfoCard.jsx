import { useParams } from "react-router-dom";
import { useJobApplications, useEmployerJobs } from "../hooks/useEmployerQueries";

export default function ApplicationInfoCard() {
  const { jobId } = useParams();
  const { data: applications = [] } = useJobApplications(jobId);
  const { data: jobs = [] } = useEmployerJobs();

  const job = jobs.find((j) => String(j.id) === String(jobId)) ?? {};
  const jobTitle = job.title || "Job " + jobId;
  const companyName = job.company || job._raw?.employer?.companyName || "Company";
  const date = job.date || "—";
  const status = job.status || "Active";
  const totalApplicants = applications.length;

  const shortlisted = applications.filter((a) => {
    const s = String(a.status ?? "").toLowerCase();
    return s === "accepted" || s === "shortlisted" || s === "interview";
  }).length;

  const underReview = applications.filter((a) => {
    const s = String(a.status ?? "").toLowerCase();
    return s === "under_review" || s === "under review" || s === "pending";
  }).length;

  const stats = [
    { label: "Total Applicants", value: totalApplicants },
    { label: "Shortlisted", value: shortlisted },
    { label: "Under Review", value: underReview },
  ];

  return (
    <div className="w-full h-fit rounded-md border-1 border-border1 bg-white p-6 flex-between">
      <div className="jobprofile flex-gap16">
        <div className="img w-14 h-14">
          <div className="w-14 h-14 rounded-md bg-violet-600 flex items-center justify-center text-white font-bold text-lg">
            {(jobTitle || "J4").slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {jobTitle}
          </h3>
          <div className="flex-gap8">
            <span className="text-text-secondary font-medium text-md">
              {companyName}
            </span>
            <div className="bg-gray-400 h-2 w-2 rounded-full"></div>
            <span>{date}</span>
            <div className="status">
              <div className="badge">{status}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="stats">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((state) => {
            return (
              <div className="flex flex-col items-center justify-center" key={state.label}>
                <p className={`mb-2 text-4xl font-bold ${state.label === "Shortlisted" ? "text-status-green-dark" : state.label === "Under Review" ? "text-[#0072C3]" : "text-primary"}`}>
                  {state.value}
                </p>
                <span className="text-[12px] text-text-placholder font-medium">
                  {state.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
