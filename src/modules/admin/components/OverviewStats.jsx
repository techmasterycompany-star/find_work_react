// =====================================================================
// OverviewStats — 4-card stats grid for the Overview page
// ---------------------------------------------------------------------
// Uses the SAME visual design as StatsCards.jsx / JobStatsCards.jsx
// (the "correct" Figma design with the Notch button top-right).
//
// Cards:
//   1. (purple)  Activation Company → pending employers count
//   2. (white)    Pending Jobs      → /admin/reviewjobs count
//   3. (white)    Total Jobs        → /jobs count
//   4. (white)    Total Users       → /admin/users count
// =====================================================================

import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';

const GRADIENT = 'bg-[linear-gradient(180deg,#2E1658_0%,#632FBE_100%)]';

function Notch({ dark }) {
  return (
    <span className="absolute right-0 top-0 flex size-[46px] items-center justify-center rounded-bl-[22px] bg-[#FAFAFA]">
      <span
        className={`flex size-9 items-center justify-center rounded-full ${
          dark ? GRADIENT + ' text-white' : 'border border-[#F5F3FF] bg-white text-zinc-600'
        }`}
      >
        <FiArrowUpRight size={16} />
      </span>
    </span>
  );
}

function WhiteStatCard({ label, value, caption, captionClass }) {
  return (
    <div className="relative h-[156px] overflow-hidden rounded-lg bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
      <Notch />
      <p className="text-xs text-zinc-600">{label}</p>
      <p className="mt-5 text-2xl font-semibold text-zinc-600">{value}</p>
      <p className={`mt-5 text-sm font-semibold ${captionClass}`}>{caption}</p>
    </div>
  );
}

export default function OverviewStats({ stats }) {
  const fmt = (n) => (n ?? 0).toLocaleString('en-US');

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Card 1: Activation Company (highlighted) */}
      <div className={`relative h-[156px] overflow-hidden rounded-lg p-6 text-zinc-200 ${GRADIENT}`}>
        <Notch dark />
        <p className="text-xs">Activation Company</p>
        <p className="mt-5 text-2xl font-semibold">{fmt(stats.pendingEmployers)}</p>
        <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
          Requires your review <FiArrowRight size={18} />
        </span>
      </div>

      {/* Card 2: Pending Jobs */}
      <WhiteStatCard
        label="Pending Jobs"
        value={fmt(stats.pendingJobs)}
        caption="Awaiting approval"
        captionClass="text-[#FCA108]"
      />

      {/* Card 3: Total Jobs */}
      <WhiteStatCard
        label="Total Jobs"
        value={fmt(stats.totalJobs)}
        caption="All jobs on platform"
        captionClass="text-zinc-600"
      />

      {/* Card 4: Total Users */}
      <WhiteStatCard
        label="Total User"
        value={fmt(stats.totalUsers)}
        caption="All registered users"
        captionClass="text-zinc-600"
      />
    </div>
  );
}
