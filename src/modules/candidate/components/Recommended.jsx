import { Link } from "react-router-dom";
import { usePublicJobs } from "../../public/hooks/usePublicQueries";

function CompanyLogo({ logo }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt=""
        className="h-9 w-9 shrink-0 rounded-lg object-cover bg-zinc-100"
      />
    );
  }
  return (
    <div className="grid grid-cols-2 gap-0.5 h-9 w-9 shrink-0">
      <span className="bg-red-500 rounded-tl" />
      <span className="bg-amber-400 rounded-tr" />
      <span className="bg-green-500 rounded-bl" />
      <span className="bg-violet-600 rounded-br" />
    </div>
  );
}

function JobCard({ job }) {
  const types = Array.isArray(job.types) ? job.types : [job.type].filter(Boolean);
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-zinc-900">{job.title}</h3>
        <span className="text-xs text-zinc-400 whitespace-nowrap">{job.posted}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <CompanyLogo logo={job.companyLogo} />
        <div>
          <p className="text-sm text-zinc-700">{job.company}</p>
          {types.length > 0 && (
            <div className="mt-1 flex gap-2">
              {types.map((t) => (
                <span
                  key={t}
                  className={`text-xs font-medium ${
                    t === "Hybrid" || t === "Remote"
                      ? "text-green-600"
                      : "text-violet-600"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm text-zinc-500 line-clamp-2">{job.description}</p>

      <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9 9.5c0-1 1-1.5 3-1.5s3 1 3 2-1 1.5-3 1.5-3 .5-3 1.5 1 2 3 2 3-.5 3-1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {job.salary}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to={`/candidate/find-jobs`}
          className="flex-1 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 text-center"
        >
          Job Details
        </Link>
        <button type="button" aria-label="Save job" className="h-10 w-10 shrink-0 rounded-lg border border-violet-200 text-violet-600 flex items-center justify-center hover:bg-violet-50">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 4h12v16l-6-4-6 4V4Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Recommended() {
  const { data: jobs = [], isLoading, isError } = usePublicJobs();
  const recommended = jobs.slice(0, 3);

  return (
    <section className="p-20">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">
            Recommended for You
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Fresh roles matching your skills and expertise.
          </p>
        </div>
        <Link
          to="/candidate/find-jobs"
          className=" text-primary text-sm font-semibold flex-gap2 hover:underline whitespace-nowrap"
        >
          View all {jobs.length} jobs
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M9 6l6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {isLoading ? (
        <p className="py-8 text-center text-sm text-zinc-500">Loading recommendations…</p>
      ) : isError ? (
        <p className="py-8 text-center text-sm text-red-500">Failed to load jobs.</p>
      ) : recommended.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">No jobs available right now.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommended.map((job) => (
            <JobCard
              key={job.id}
              job={{
                ...job,
                posted: job.date, 
                description: job.desc,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
