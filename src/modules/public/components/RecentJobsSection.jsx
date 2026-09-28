import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const JOBS = Array.from({ length: 2 }, () => ({
  company: 'UXLabs Company',
  postedDate: 'Feb 16, 2023',
  location: 'Canada',
  salary: '$40000-$42000',
  title: 'Software Developer',
  type: 'Full Time',
  description: 'Develop and maintain software applications and programs for our clients using various programming languages and platforms.',
  daysLeft: 25,
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

function JobOfferCard({ job }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 flex gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <CompanyLogo />
          <div>
            <p className="text-sm font-semibold text-zinc-900">{job.company}</p>
            <p className="text-xs text-zinc-400">{job.postedDate}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-zinc-600">
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
              <path d="M12 7v10" strokeLinecap="round" />
            </svg>
            {job.salary}
          </span>
        </div>

        <h3 className="mt-3 font-bold text-zinc-900">{job.title}</h3>
        <span className="mt-1.5 inline-block px-2.5 py-0.5 rounded-full border border-violet-200 text-violet-600 text-xs font-medium">
          {job.type}
        </span>
        <p className="mt-2 text-sm text-zinc-500">{job.description}</p>
      </div>

      <div className="shrink-0 w-28 rounded-xl border border-zinc-200 flex flex-col items-center justify-center py-3 gap-1 text-center">
        <p className="text-xs text-zinc-400">Job Closed in</p>
        <p className="text-3xl font-bold text-violet-600 leading-none">{job.daysLeft}</p>
        <p className="text-xs text-zinc-400 tracking-wide">DAYS</p>
        <Link to="/jobs" className="mt-2 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700">
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default function RecentJobsSection() {
  const [page, setPage] = useState(2);

  return (
    <section className="px-20 py-16">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Featured Job Offers</h2>
          <p className="mt-1 text-sm text-zinc-500">Hand-picked positions from leading brands looking for exceptional talent.</p>
        </div>
        <Pagination current={page} total={9} onChange={setPage} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {JOBS.map((job, i) => (
          <JobOfferCard key={i} job={job} />
        ))}
      </div>
    </section>
  );
}