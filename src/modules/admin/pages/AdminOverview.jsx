// =====================================================================
// AdminOverview — stat cards now use the unified "correct" design
// (matching StatsCards / JobStatsCards with the Notch button).
// =====================================================================

import DateSelector from '../components/DateSelector';
import OverviewStats from '../components/OverviewStats';
import UserGrowth from '../components/UserGrowth';
import RecentActivities from '../components/RecentActivities';
import TopLocations from '../components/TopLocations';
import JobsByCategory from '../components/JobsByCategory';
import { useAdminUsers, useAllJobs, useReviewJobs } from '../hooks/useAdminQueries';
import { toCompanyRow } from '../services/adminAdapters';

export default function AdminOverview() {
  // ----- Data -----
  const { data: users = [] } = useAdminUsers();
  const { data: reviewJobs = [] } = useReviewJobs();
  const { data: allJobs = [] } = useAllJobs();

  // ----- Derived stats -----
  const pendingEmployers = users
    .filter((u) => u.role === 'employer')
    .map(toCompanyRow)
    .filter((c) => c.status === 'pending').length;

  const stats = {
    pendingEmployers,
    pendingJobs: reviewJobs.length,
    totalJobs: allJobs.length,
    totalUsers: users.length,
  };

  return (
    <div className="flex w-full flex-col gap-7">
      {/* Date */}
      <div className="flex justify-end">
        <DateSelector />
      </div>

      {/* ================= STATS ================= */}
      <OverviewStats stats={stats} />

      {/* ================= ANALYTICS ================= */}
      {/* Charts below still use mock data — see INTEGRATION_NOTES.md.
          They need a dedicated /admin/analytics endpoint. */}
      <section className="flex w-full gap-6">
        <UserGrowth />
        <RecentActivities />
      </section>

      {/* ================= BOTTOM ================= */}
      <section className="flex w-full gap-6">
        <TopLocations />
        <JobsByCategory />
      </section>
    </div>
  );
}
