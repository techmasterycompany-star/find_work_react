import { Link } from 'react-router-dom';

const BOX_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 8 9-5 9 5-9 5-9-5Zm0 0v8l9 5m0-13v13m0-13 9 5v8l-9 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BRIEFCASE_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const COIN_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CATEGORIES = [
  { name: 'Human Resources', count: '68 + Job available', icon: BOX_ICON },
  { name: 'Healthcare', count: '156 + Job available', icon: BRIEFCASE_ICON },
  { name: 'Finance', count: '95 + Job available', icon: COIN_ICON },
  { name: 'Construction', count: '84 + Job available', icon: BOX_ICON },
  { name: 'Customer Service', count: '204 + Job available', icon: BRIEFCASE_ICON },
  { name: 'Business Dev', count: '120 + Job available', icon: COIN_ICON },
];

export default function CategorySection() {
  return (
    <section className="px-20 py-16">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Search by Category</h2>
          <p className="mt-1 text-sm text-zinc-500">Explore available opportunities tailored to specific fields and industries</p>
        </div>
        <Link
          to="/jobs"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 whitespace-nowrap"
        >
          View all categories
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            to={`/jobs?category=${encodeURIComponent(cat.name)}`}
            className="flex items-center gap-3"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              {cat.icon}
            </div>
            <div>
              <p className="font-semibold text-violet-600 text-sm">{cat.name}</p>
              <p className="text-xs text-zinc-500">{cat.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}