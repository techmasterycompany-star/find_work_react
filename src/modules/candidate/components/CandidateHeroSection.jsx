import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import photo7 from "../../../assets/photo7.jpg";
import { useAuth } from "../../../context/AuthContext";
import { useMyApplications, useCandidateProfile } from "../hooks/useCandidateQueries";
import { usePublicJobs } from "../../public/hooks/usePublicQueries";

const POPULAR_SEARCHES = [
  "Financial Analyst",
  "Designer",
  "Writer",
  "Team Leader",
  "Fullstack",
  "Web Developer",
  "Senior",
];

function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function CandidateHeroSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const { data: applications = [] } = useMyApplications();
  const { data: jobs = [] } = usePublicJobs();
  const { data: profile } = useCandidateProfile();

  const displayName = user?.name ?? "Candidate";
  const headline = profile?.candidateProfile?.headline ?? profile?.headline ?? "Job Seeker";

  const activeMatches = jobs.length;
  const appliedRoles = applications.length;
  const interviews = applications.filter((a) => {
    const status = String(a.status ?? "").toLowerCase();
    return status === "interview" || status === "accepted";
  }).length;
  const activeJobsToday = jobs.length;

  const handleFindJobs = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    navigate(`/candidate/find-jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative min-h-[517px] overflow-hidden bg-[#faf8ff]">
      <div className="absolute -right-[100px] -top-[80px] h-[400px] w-[400px] rounded-full bg-violet-100/70" />
      <div className="absolute -bottom-[180px] -left-[110px] h-[360px] w-[360px] rounded-full bg-violet-100/60" />
      <div className="absolute bottom-[60px] right-[90px] h-[220px] w-[220px] rounded-full bg-[#F3E8FF]" />

      <div className="relative mx-auto flex min-h-[517px] max-w-[1440px] items-center justify-between px-[54px]">
        <div className="relative z-10 w-[62%] pt-[10px]">
          <div className="mb-[24px] inline-flex items-center gap-[7px] rounded-full bg-violet-100 px-[12px] py-[6px] text-[12px] font-medium text-violet-600">
            <span className="h-[7px] w-[7px] rounded-full bg-violet-600" />
            {activeJobsToday.toLocaleString()} Active Jobs Today
            <span className="ml-[4px] text-zinc-500">♙</span>
          </div>

          <h1 className="max-w-[680px] text-[46px] font-bold leading-[1.12] tracking-[-1.4px] text-zinc-900">
            Good morning, {displayName.split(" ")[0]}
          </h1>

          <p className="mt-[14px] max-w-[650px] text-[14px] leading-[1.45] text-zinc-500">
            You have <span className="text-primary font-bold"> {Math.min(activeMatches, 3)} new recommended roles </span> matching your profile and {interviews} active {interviews === 1 ? "interview" : "interviews"} scheduled this week.
          </p>

          <div className="mt-[20px] flex h-[54px] w-[700px] items-center overflow-hidden rounded-[7px] border border-zinc-200 bg-white shadow-sm">
            <div className="flex h-full flex-1 items-center border-r border-zinc-200 px-[14px]">
              <svg viewBox="0 0 24 24" className="mr-[9px] h-[18px] w-[18px] text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleFindJobs(); }}
                placeholder="Job title, keywords or Company"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-700 outline-none placeholder:text-zinc-400"
              />
            </div>

            <div className="flex h-full w-[250px] items-center px-[14px]">
              <svg viewBox="0 0 24 24" className="mr-[9px] h-[18px] w-[18px] text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleFindJobs(); }}
                placeholder='location or "remote"'
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-700 outline-none placeholder:text-zinc-400"
              />
            </div>

            <button
              type="button"
              onClick={handleFindJobs}
              className="mr-[8px] h-[36px] rounded-[6px] bg-violet-600 px-[17px] text-[13px] font-medium text-white transition-colors hover:bg-violet-700"
            >
              Find Jobs
            </button>
          </div>

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
        </div>

        <div className="states">
          <div className="big-card z-50  w-[380px] flex items-center gap-4 bg-white p-5 rounded-xl shadow-[0px 8px 24px] shadow-2xl shadow-card-shadow border-border1">
            <div className="img w-16 h-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-600 text-xl font-bold border-2 border-primary">
              {getInitials(displayName)}
            </div>
            <div className="cont">
              <h3 className="text-lg text-text-primary font-bold">
                {displayName}
              </h3>
              <span className="text-text-placholder font-normal mt-[6px] text-sm">
                {headline}
              </span>
              <div className="tags flex items-center gap-2 mt-[6px]">
                <span className="py-1 px-2 block flex-center h-5 w-fit rounded-sm bg-status-green-fill text-status-green-dark text-[12px]">
                  Active Candidate
                </span>
                <Link to="/candidate/settings" className="text-[12px] text-primary font-semibold cursor-pointer hover:underline">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="cards grid grid-cols-3 gap-3 w-[380px] mt-8">
            <div className="box bg-surface p-4 rounded-lg shadow-[0px 8px 24px] shadow-2xl shadow-card-shadow border-border1">
              <p className="mb-1 text-[22px] font-bold text-primary">{activeMatches}</p>
              <span className="text-[12px]  font-medium text-text-placholder">Active matches</span>
            </div>
            <div className="box bg-surface p-4 rounded-lg shadow-[0px 8px 24px] shadow-2xl shadow-card-shadow border-border1">
              <p className="mb-1 text-[22px] font-bold text-warning">{appliedRoles}</p>
              <span className="text-[12px] font-medium text-text-placholder">Applied roles</span>
            </div>
            <div className="box bg-surface p-4 rounded-lg shadow-[0px 8px 24px] shadow-2xl shadow-card-shadow border-border1">
              <p className="mb-1 text-[22px] font-bold text-status-green-dark">{interviews}</p>
              <span className="text-[12px] font-medium text-text-placholder">Interviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
