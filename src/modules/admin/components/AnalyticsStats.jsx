// =====================================================================
// AnalyticsStats — now uses the SAME visual design as the other stat
// cards (StatsCards / JobStatsCards / OverviewStats / UserManagementStats)
// with the Notch button top-right.
//
// Since the backend has no /admin/analytics endpoint yet, we keep the
// mock data from analyticsData.js but render it through the unified
// card component. When the endpoint exists, just swap the data source.
// =====================================================================

import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import { analyticsStats } from '../services/analyticsData';

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

function WhiteStatCard({ title, value, change, description }) {
  return (
    <div className="relative min-h-[156px] overflow-hidden rounded-lg bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
      <Notch />
      <p className="text-xs text-zinc-600">{title}</p>
      <p className="mt-5 text-2xl font-semibold text-zinc-600">{value}</p>
      <div className="mt-5 flex items-center gap-1">
        <span className="text-sm font-medium text-[#22C55E]">{change}</span>
        <span className="text-sm text-zinc-600">{description}</span>
      </div>
    </div>
  );
}

function FeaturedStatCard({ title, value }) {
  return (
    <div className={`relative min-h-[156px] overflow-hidden rounded-lg p-6 text-zinc-200 ${GRADIENT}`}>
      <Notch dark />
      <p className="text-xs">{title}</p>
      <p className="mt-5 text-2xl font-semibold">{value}</p>
      <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
        View details <FiArrowRight size={18} />
      </span>
    </div>
  );
}

export default function AnalyticsStats() {
  return (
    <section className="grid grid-cols-4 gap-6">
      {analyticsStats.map((stat) =>
        stat.featured ? (
          <FeaturedStatCard key={stat.title} title={stat.title} value={stat.value} />
        ) : (
          <WhiteStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            description={stat.description}
          />
        ),
      )}
    </section>
  );
}
