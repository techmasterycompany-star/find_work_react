import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const TESTIMONIALS = [
  {
    quote:
      "As a recent graduate, I was struggling to find a job in my field. JobLinkup helped me find the perfect job, and the platform made it easy to apply and stay organized throughout my job search process. I highly recommend it to anyone starting out.",
    name: "Marvin McKinney",
    role: "Job Seeker",
  },
  {
    quote:
      "I highly recommend JobLinkup to anyone looking for a job. The platform is user-friendly and the job listings are always up-to-date. I found my dream job thanks to JobLinkup and I couldn't be happier. The entire process was smooth and the support team was incredibly helpful throughout my journey.",
    name: "Marvin McKinney",
    role: "Job Seeker",
  },
  {
    quote:
      "JobLinkup made it easy to find a job that fit my skills and experience. The platform is user-friendly and I found a job in my field in just a few weeks. The application process was quick and straightforward. I would definitely recommend this platform to anyone looking for work.",
    name: "Marvin McKinney",
    role: "Job Seeker",
  },
];

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

export default function TestimonialsSection() {
  const [page, setPage] = useState(2);

  return (
    <section className="px-20 py-16">
      <h2 className="text-2xl font-bold text-zinc-900">What Our Clients Say</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Real stories from professionals who transformed their careers with our
        platform.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <svg
              viewBox="0 0 32 24"
              className="h-6 w-8 text-violet-600"
              fill="currentColor"
            >
              <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.6C9.6 5.2 7.2 8 7.2 12h6.4V24H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4L32 3.6C27.2 5.2 24.8 8 24.8 12h6.4V24H17.6Z" />
            </svg>
            <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
              {t.quote}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-zinc-200 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination current={page} total={10} onChange={setPage} showArrows />
      </div>

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
