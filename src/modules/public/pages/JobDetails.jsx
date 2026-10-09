import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BreadCrump from "../../../components/BreadCrump";
import { useJobDetails } from "../hooks/useJobDetails";
import { useSaveJob, useCheckSavedJob } from "../../candidate/hooks/useCandidateQueries";
import ApplyJobModal from "../components/ApplyJobModal";
import { HiOutlineBookmark, HiOutlineArrowLeft } from "react-icons/hi2";

function StarRating({ rating = 4 }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill={i < Math.round(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useJobDetails(jobId);
  const saveJob = useSaveJob();
  const { data: isSaved = false } = useCheckSavedJob(jobId);
  const [applyOpen, setApplyOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">Loading job...</div>
    );
  }
  if (isError || !job) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-500">Failed to load job.</p>
        <Link to="/candidate/find-jobs" className="mt-3 inline-block text-sm font-semibold text-violet-600 hover:underline">
          ← Back to Find Jobs
        </Link>
      </div>
    );
  }

  const raw = job._raw ?? {};
  const employer = raw.employer ?? raw.company ?? {};
  const category = raw.category ?? {};
  const technologies = raw.technologies ?? [];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-b from-[#EDE9FE] to-white px-20 py-8">
        <div className="mx-auto max-w-7xl">
          <BreadCrump firstlink="Find Jobs" secondlink="Job Details" />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-violet-600"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-base font-medium text-gray-700">{job.company}</span>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                  {job.type}
                </span>
                {raw.workType && raw.workType !== job.type && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {raw.workType}
                  </span>
                )}
                <span className="text-sm text-gray-500">📍 {job.location}</span>
                <span className="text-sm text-gray-500">💼 {job.salary}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-20 py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-3 text-lg font-bold text-gray-900">Overview</h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {raw.description || job.desc || "No overview provided for this role."}
              </p>
            </section>

            {raw.responsibilities && (
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h2 className="mb-3 text-lg font-bold text-gray-900">Job Description</h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                  {raw.responsibilities}
                </p>
              </section>
            )}

            {raw.requirements && (
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h2 className="mb-3 text-lg font-bold text-gray-900">Requirements</h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                  {raw.requirements}
                </p>
              </section>
            )}

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-3 text-lg font-bold text-gray-900">Tags</h2>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {category.name ?? "General"}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {job.type}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {raw.experienceLevel ?? "Any level"}
                </span>
                {raw.workType && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {raw.workType}
                  </span>
                )}
                {technologies.map((t) => (
                  <span
                    key={typeof t === "string" ? t : t._id}
                    className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700"
                  >
                    {typeof t === "string" ? t : t.name}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Company Info</h2>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-violet-600 text-xl font-bold text-white">
                  {(job.company ?? "J4").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900">{job.company}</h3>
                    {raw.status === "approved" && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        Hiring
                      </span>
                    )}
                  </div>
                  <StarRating rating={employer.rating ?? 4} />
                  <p className="mt-2 text-sm text-gray-600">
                    {employer.description || employer.about || "Company description not available."}
                  </p>
                  <div className="mt-3 flex gap-6 text-xs text-gray-500">
                    <span>
                      <strong className="text-gray-900">{employer.employeeCount ?? "—"}</strong> employees
                    </span>
                    <span>
                      <strong className="text-gray-900">{employer.industry ?? "—"}</strong> industry
                    </span>
                    <span>
                      <strong className="text-gray-900">{employer.location ?? "—"}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-6 space-y-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setApplyOpen(true)}
                  className="flex-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-violet-700"
                >
                  Apply This Job
                </button>
                <button
                  type="button"
                  onClick={() => saveJob.mutate(jobId)}
                  disabled={isSaved || saveJob.isPending}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300 text-violet-600 hover:bg-violet-50 disabled:opacity-60"
                  aria-label="Save job"
                  title={isSaved ? "Saved" : "Save job"}
                >
                  <HiOutlineBookmark className="h-5 w-5" fill={isSaved ? "#7c3aed" : "none"} />
                </button>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h3 className="mb-4 text-base font-bold text-gray-900">Job Overview</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Job Title</dt>
                    <dd className="font-medium text-gray-900">{job.title}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Job Type</dt>
                    <dd className="font-medium text-gray-900">{job.type}</dd>
                  </div>
                  {raw.applicationDeadline && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Expires</dt>
                      <dd className="font-medium text-gray-900">
                        {new Date(raw.applicationDeadline).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Job Level</dt>
                    <dd className="font-medium text-gray-900 capitalize">
                      {raw.experienceLevel ?? "Any"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Salary</dt>
                    <dd className="font-medium text-gray-900">{job.salary}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Location</dt>
                    <dd className="font-medium text-gray-900">{job.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Category</dt>
                    <dd className="font-medium text-gray-900">{category.name ?? "General"}</dd>
                  </div>
                </dl>
                {technologies.length > 0 && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="mb-2 text-xs font-semibold text-gray-700">Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {technologies.map((t) => (
                        <span
                          key={typeof t === "string" ? t : t._id}
                          className="rounded bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700"
                        >
                          {typeof t === "string" ? t : t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/candidate/find-jobs"
                className="block text-center text-sm font-medium text-violet-600 hover:underline"
              >
                ← Back to Find Jobs
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <ApplyJobModal job={job} open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}
