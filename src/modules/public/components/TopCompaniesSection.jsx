import { Link } from 'react-router-dom';
import logo from '../../../assets/Frame 2147224373.png';
const COMPANIES = [
  { name: 'Tech Company', logo :logo, employees: '1,234 employees', jobsOpen: '50 Jobs open' },
  { name: 'Creative Agency', logo: logo, employees: '300 employees', jobsOpen: '20 Jobs open' },
  { name: 'Healthcare Startup', logo: logo, employees: '120 employees', jobsOpen: '15 Jobs open' },
  { name: 'Financial Firm', logo: logo, employees: '2,500 employees', jobsOpen: '40 Jobs open' },
  { name: 'Northwind Logistics', logo: logo, employees: '1,840 employees', jobsOpen: '28 Jobs open' },
  { name: 'Lumina Creative', logo: logo, employees: '210 employees', jobsOpen: '12 Jobs open' },
  { name: 'Aurora Health', logo: logo, employees: '980 employees', jobsOpen: '18 Jobs open' },
  { name: 'Meridian Capital', logo: logo, employees: '3,120 employees', jobsOpen: '45 Jobs open' },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TopCompaniesSection() {
  return (
    <section className="px-20 py-16">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Top Hiring Companies</h2>
          <p className="mt-1 text-sm text-zinc-500">Leading organizations actively looking for exceptional talent</p>
        </div>
        <Link to="/companies" className="flex items-center gap-1 text-sm font-semibold text-violet-600 hover:underline whitespace-nowrap">
          All Companies
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
        {COMPANIES.map((c) => (
          <div key={c.name} className="rounded-xl border border-zinc-200 p-4">
            <div className="flex items-center gap-3">
              <img src={c.logo} alt={c.name} className="h-10 w-10 rounded-lg object-cover bg-zinc-900" />
              <div>
                <p className="font-semibold text-zinc-900 text-sm">{c.name}</p>
                <StarRating />
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-1 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c.employees}
              </span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c.jobsOpen}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}