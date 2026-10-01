import { Link } from "react-router-dom";

const CTA_TRUST_POINTS = [
  "No spam, ever",
  "Cancel anytime",
  "50,000+ active users",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        d="m8.5 12.5 2.5 2.5 4.5-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutBanner() {
  return (
    <section className="bg-surface py-12 px-20">
      <div className="mt-16 relative overflow-hidden rounded-3xl bg-purple-950 px-16 py-14 text-center text-white">
        <div className="pointer-events-none absolute -left-10 -bottom-16 h-52 w-52 rounded-full bg-violet-800/40" />
        <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-violet-800/40" />

        <h3 className="text-3xl font-bold max-w-2xl mx-auto">
          Join us today and discover thousands of jobs
        </h3>
        <p className="mt-4 text-zinc-300 max-w-xl mx-auto">
          Create your free account and connect with top employers who are
          looking for someone exactly like you.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/auth/role-select"
            className="px-6 py-3 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700"
          >
            Create Free Account
          </Link>
          <Link
            to="/jobs"
            className="px-6 py-3 rounded-lg border border-zinc-600 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Browse Jobs
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-8 text-sm text-zinc-400">
          {CTA_TRUST_POINTS.map((point) => (
            <span key={point} className="flex items-center gap-1.5">
              <CheckIcon />
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
