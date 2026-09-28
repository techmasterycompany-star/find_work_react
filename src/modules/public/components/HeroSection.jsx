import { useState } from "react";
import profileImage from "../../../assets/hero-professional-portrait.png";

const POPULAR_SEARCHES = [
  "Financial Analyst",
  "Designer",
  "Writer",
  "Team Leader",
  "Fullstack",
  "Web Developer",
  "Senior",
];

const STAT_CARDS = [
  {
    count: "319",
    label: "job offers",
    sub: "in Business Development",
  },
  {
    count: "265",
    label: "job offers",
    sub: "in Marketing & Tech",
  },
  {
    count: "324",
    label: "job offers",
    sub: "in Project Management",
  },
];

const QUICK_STATS = [
  { value: "12.8K+", label: "Active Jobs" },
  { value: "8,500+", label: "Companies" },
  { value: "92%", label: "Match Rate" },
];

const PARTNERS = ["Google", "Microsoft", "Amazon", "Spotify", "Stripe"];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative min-h-[517px] overflow-hidden bg-[#faf8ff]">
      <div className="absolute -right-[100px] -top-[80px] h-[400px] w-[400px] rounded-full bg-violet-100/70" />

      <div className="absolute -bottom-[180px] -left-[110px] h-[360px] w-[360px] rounded-full bg-violet-100/60" />

      <div className="relative mx-auto flex min-h-[517px] max-w-[1440px] items-center px-[54px]">
        {/* LEFT */}
        <div className="relative z-10 w-[62%] pt-[10px]">
          <div className="mb-[24px] inline-flex items-center gap-[7px] rounded-full bg-violet-100 px-[12px] py-[6px] text-[12px] font-medium text-violet-600">
            <span className="h-[7px] w-[7px] rounded-full bg-violet-600" />

            12,800 Active Jobs Today

            <span className="ml-[4px] text-zinc-500">♙</span>
          </div>

          <h1 className="max-w-[680px] text-[46px] font-bold leading-[1.12] tracking-[-1.4px] text-zinc-900">
            Find the perfect job for you
          </h1>

          <p className="mt-[14px] max-w-[650px] text-[14px] leading-[1.45] text-zinc-500">
            Search your career opportunity through 12,800 active jobs posted
            today. Discover curated roles that perfectly match your skills and
            lifestyle.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-[20px] flex h-[54px] w-[700px] items-center overflow-hidden rounded-[7px] border border-zinc-200 bg-white shadow-sm">
            <div className="flex h-full flex-1 items-center border-r border-zinc-200 px-[14px]">
              <svg
                viewBox="0 0 24 24"
                className="mr-[9px] h-[18px] w-[18px] text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" strokeLinecap="round" />
              </svg>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, keywords or Company"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-700 outline-none placeholder:text-zinc-400"
              />
            </div>

            <div className="flex h-full w-[250px] items-center px-[14px]">
              <svg
                viewBox="0 0 24 24"
                className="mr-[9px] h-[18px] w-[18px] text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='location or "remote"'
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-700 outline-none placeholder:text-zinc-400"
              />
            </div>

            <button
              type="button"
              className="mr-[8px] h-[36px] rounded-[6px] bg-violet-600 px-[17px] text-[13px] font-medium text-white transition-colors hover:bg-violet-700"
            >
              Find Jobs
            </button>
          </div>

          {/* POPULAR SEARCHES */}
          <div className="mt-[16px]">
            <p className="mb-[9px] text-[11px] font-semibold text-zinc-800">
              Popular Searches:
            </p>

            <div className="flex flex-wrap gap-[7px]">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-zinc-300 bg-white px-[11px] py-[4px] text-[10px] text-zinc-600 transition-colors hover:border-violet-300 hover:text-violet-600"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="mt-[22px] flex items-center">
            {QUICK_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`pr-[32px] ${
                  index !== 0 ? "border-l border-zinc-200 pl-[32px]" : ""
                }`}
              >
                <p className="text-[20px] font-bold leading-none text-zinc-900">
                  {stat.value}
                </p>

                <p className="mt-[6px] text-[10px] text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* TRUSTED BY */}
          <div className="mt-[18px] flex items-center gap-[14px]">
            <span className="text-[10px] text-zinc-500">Trusted by:</span>

            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="text-[10px] font-semibold text-zinc-400"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — UNCHANGED */}
        <div className="absolute right-[38px] top-[38px] h-[430px] w-[390px]">
          <div className="absolute right-[30px] top-[28px] h-[370px] w-[260px] rotate-[7deg] rounded-[30px] bg-violet-400/80" />

          <div className="absolute right-[0px] top-[45px] h-[350px] w-[235px] rotate-[14deg] rounded-[30px] bg-violet-200/70" />

          <div className="absolute right-[70px] top-[30px] h-[405px] w-[250px] overflow-hidden rounded-[27px] bg-zinc-300 shadow-lg">
            <img
              src={profileImage}
              alt="Professional candidate"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute right-[-3px] top-[235px] z-20 flex w-[120px] flex-col gap-[8px]">
            {STAT_CARDS.map((card) => (
              <div
                key={card.sub}
                className="rounded-[10px] border border-zinc-100 bg-white px-[9px] py-[8px] shadow-md"
              >
                <div className="flex items-baseline gap-[4px]">
                  <span className="text-[15px] font-bold text-violet-600">
                    {card.count}
                  </span>

                  <span className="text-[7px] text-zinc-500">
                    {card.label}
                  </span>
                </div>

                <p className="mt-[2px] text-[7px] leading-[1.2] text-zinc-500">
                  {card.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute bottom-[3px] right-[40px] z-30 rounded-[5px] border border-violet-300 bg-white px-[11px] py-[4px] text-[7px] font-medium text-violet-600 shadow-sm">
            Top Companies
          </div>
        </div>
      </div>
    </section>
  );
}