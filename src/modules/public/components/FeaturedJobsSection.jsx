import { useState } from 'react';

const FILTERS = ['All Offers', 'Full-time', 'Part-time', 'Remote', 'Internship'];
const JOBS = Array.from({ length: 6 }, () => ({
  title: 'UI/UX Designer',
  company: 'Tech Company',
  posted: '1 hour ago',
  types: ['Full-Time', 'Hybrid'],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et...',
  location: 'Canada',
  salary: '$40000-$42000',
}));

function CompanyLogo() {
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
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-zinc-900">{job.title}</h3>
        <span className="text-xs text-zinc-400 whitespace-nowrap">{job.posted}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <CompanyLogo />
        <div>
          <p className="text-sm text-zinc-700">{job.company}</p>
          <div className="mt-1 flex gap-2">
            {job.types.map((t) => (
              <span
                key={t}
                className={`text-xs font-medium ${t === 'Hybrid' ? 'text-green-600' : 'text-violet-600'}`}
              >
                {t}
              </span>
            ))}
          </div>
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
        <button type="button" className="flex-1 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700">
          Job Details
        </button>
        <button type="button" aria-label="Save job" className="h-10 w-10 shrink-0 rounded-lg border border-violet-200 text-violet-600 flex items-center justify-center hover:bg-violet-50">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 4h12v16l-6-4-6 4V4Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function FeaturedJobsSection() {
  const [activeFilter, setActiveFilter] = useState('All Offers');

  return (
    <section className="px-20 py-16">
      <h2 className="text-2xl font-bold text-zinc-900">Most Popular Job</h2>

      <div className="mt-4 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              activeFilter === f ? 'bg-violet-600 text-white' : 'text-violet-600 hover:bg-violet-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {JOBS.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
      </div>
    </section>
  );
}